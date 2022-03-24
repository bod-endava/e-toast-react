import React, { Children, useState } from 'react';
import getClassName from 'getclassname';
import * as E from '../../commons/structures/either'
import { useClickOutsideDetector } from '../../commons/hooks/useClickOutsideDetector';
import { FormAPI } from '../Form';
import { useEffect } from 'react';
import { createEvent, OpaqueEventHandler } from '../../commons/structures/opaque-event';
import { OptionData, default as Option } from './Option';

type ClassName = ReturnType<typeof getClassName>
export interface SelectProps {
  /**
   * Id of the select element. Required if name is not passed
   */
  id?: string;
  /**
   * name of the selected element. Required if id is not passed. Has preference over id for form change event
   */
  name?: string;
  /**
  * Array with elements to be displayed. Required if no children are passed
  */
  options?: string[] | OptionData[];
  /**
  * onChange event handler triggered when an option is selected.
  */
  onChange?: OpaqueEventHandler<number | string>;
  /**
  * Disable the interaction with the select.
  */
  disabled?: boolean;
  /**
  * Set the current selected option. If there is no option with a value of selected, the first option is used instead
  */
  selected?: string | number;
  /**
   * Sets the initial selected value. Ignored if selected is passed
   */
  initialValue?: string | number;
  /**
   * Options to be displayed. Required if no options prop is passed.
   * Must be Select.Option components
   */
  children?: React.ReactNode;
  /**
   * **This prop is only used for automatic form handling should not be used directly**
   * Form API object used to hook select to form state. Normally, this prop is passed automatically by the form.
   */
  formAPI?: FormAPI<any>;
  /**
   * Props passed down to the underlying div component
   */
  divProps?: React.ComponentPropsWithoutRef<"div">;
}

interface ArrowProps {
  open: boolean
  className: ClassName
}

const Arrow = ({ className: root, open }: ArrowProps) => {
  const icon = root.element("icon").recompute({
    "&--open": open
  })

  return <span className={root}>
    <span className={icon}></span>
  </span>
}

type SelectComponent = React.FC<SelectProps> & {
  Option: typeof Option
}

const isOption = (x: any): x is React.ReactElement<OptionData, typeof Option> => React.isValidElement(x) && x?.type === Option

const getOptionsFromChildren = (children: React.ReactChildren): OptionData[] => {
  return Children.toArray(children)
    .map(child => isOption(child) ? child.props : undefined)
    .filter((x: OptionData | undefined): x is OptionData => x !== undefined)
}

const wrapData = (data: string | OptionData): OptionData => typeof data === "string"
  ? ({ value: data, text: data }) : data

const Select: SelectComponent = (props) => {
  const {
    options: rawOptions,
    name,
    id,
    onChange,
    initialValue,
    disabled = false,
    selected,
    formAPI,
    divProps = {},
    children
  } = props

  const controlled = E.fromBoolean(Boolean((onChange && selected) || formAPI))
  const options = rawOptions
    ? rawOptions.map(wrapData)
    : getOptionsFromChildren(children as React.ReactChildren)

  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    controlled
      .map(() => options.find(({ value }) => value === selected) ?? options[0])
      .onLeft(() => E
        .fromNullish(initialValue)
        .map(init => options.find(({ value }) => value === init) ?? options[0])
        .onLeft(() => options[0])
      )
  );

  useEffect(() => {
    controlled.map(() => {
      setSelectedOption(options.find(({ value }) => value === selected) ?? options[0])
    })
  }, [selected])

  const selectRef = useClickOutsideDetector<HTMLDivElement>(() => { setOpen(false) })

  const rootCl = getClassName({
    base: "eds-select",
    "&--disabled": disabled
  })

  const selectedCl = rootCl.element("selected")
  const selectedContentCl = selectedCl.element("content")
  const selectedArrowCl = selectedCl.element("arrow")

  const listCl = rootCl.element("list").recompute({ "&--open": open })

  const handleClick = () => {
    E.fromBoolean(!disabled)
      .map(() => setOpen(x => !x))
  }

  const handleSelect = (target: OptionData) => {
    const maybeEnabled = E.fromBoolean(!disabled)

    maybeEnabled.map(() => {
      const event = createEvent('select', `${name || id}`, target.value)
      E.fromNullish(formAPI).map(api => api.handleChange(event as React.ChangeEvent<any>))
      E.fromNullish(onChange).apply(event)
      controlled.mapLeft(() => setSelectedOption(target))
    })
  }

  const renderOptions = () => {
    return E.fromNullish(options)
      .map(opts => opts.map((opt, idx) => <Option
        key={`${idx}-${opt.value}`}
        text={opt.text}
        value={opt.value}
        hidden={false}
        onClick={() => handleSelect(opt)}
      />))
      .onLeft(() => children ? [<>{children}</>] : [<></>])
  }

  return <div ref={selectRef} className={rootCl} onClick={handleClick} {...divProps}>
    <span className={selectedCl}>
      <span className={selectedContentCl}>{selectedOption.text}</span>
      <Arrow className={selectedArrowCl} open={open} />
    </span>
    <div className={listCl}>
      {renderOptions()}
    </div>
  </div>
}

Select.Option = Option

export default Select