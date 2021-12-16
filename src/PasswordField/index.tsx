import getClassName from 'getclassname';
import React, { useState } from 'react';
import { FormAPI } from '../Form/API';
import { Icons } from '../shared/types';

interface PasswordFieldPropsWithoutRef {
  /**
   * The `id` attribute to be passed to the underlying input element. Will default to `name`, then `label` props
   */
  id?: string;
  /**
   * The `label` attribute to be passed to the underlying input element
   */
  label?: string;
  /**
   * The `name` attribute to be passed to the underlying input element. Will default to `id`, then `label` props
   */
  name?: string;
  /**
   * Icon to be placed on the right of the input
   */
  icon?: Icons;
  /**
   * Error to show, if any. If no error is intended then undefined should be passed
   */
  error?: string;
  /**
   * Whether the input is in success state
   */
  success?: boolean;
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * Props to pass to the underlying input element
   */
  inputProps?: React.ComponentPropsWithoutRef<"input">;
  /**
   * Props to pass to the container of the input element
   */
  inputContainerProps?: React.ComponentPropsWithoutRef<"div">;
  /**
   * The `placeholder` attribute to be passed to the underlying input element
   */
  placeholder?: string;
  /**
   * Force a value on the input. If passed the input will behave as a controlled component. 
   * Otherwise will behave as an uncontrolled component
   */
  value?: string;
  /**
   * Initial value to be used for the input.
   */
  initialValue?: string;
  /**
   * **This prop is only used for automatic form handling should not be used directly**
   * Form API object used to hook input to form state. Normally, this prop is passed automatically by the form.
   */
  formAPI?: FormAPI<any>;
  /**
   * onChange event handler. Triggers on every change
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * onClick event handler for the icon. If no icon is passed, this event will never trigger
   */
  onIconClick?: React.MouseEventHandler<HTMLSpanElement>;
}

export type PasswordFieldProps = PasswordFieldPropsWithoutRef & {
  /**
   * Ref to the inner input component
   */
  ref?: React.ForwardedRef<HTMLInputElement>;
}
export type PasswordFieldInnerElement = HTMLInputElement

const PasswordField = React.forwardRef<PasswordFieldInnerElement, PasswordFieldPropsWithoutRef>(({
  id,
  label,
  name,
  icon,
  error,
  success=false,
  disabled=false,
  inputProps={},
  inputContainerProps={},
  placeholder,
  value,
  initialValue,
  formAPI,
  onChange,
  onIconClick,
}, ref) => {
  const controlled = value !== undefined;
  const [innerValue, setInnerValue] = useState(initialValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formAPI?.handleChange?.(e);
    onChange?.(e)
    !controlled && setInnerValue(e.target.value);
  }

  const handleClick = (e: React.MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => {
    if( !disabled ){
      onIconClick?.(e);
    }
  }

  const root = getClassName({
    base: "eds-outline-input",
    "&--error": Boolean(error),
    "&--success": success,
  });
  const container = root.extend("&__container");
  const labelRoot = root.extend("&__label").recompute({ "&--error": Boolean(error) })
  const labelText = labelRoot.extend("&__text").recompute({
    "&--error": Boolean(error),
    "&--disabled": disabled
  })
  const labelRight = labelRoot.extend("&__error-alert");
  const partialIconClass= root.extend("&__icon").recompute({
    "&--error": Boolean(error),
    "&--disabled": disabled,
    "&--success": success,
  })
  const iconClass = `eds-icon ${icon} ${partialIconClass}`

  return <div className={container} {...inputContainerProps}>
    <div className={labelRoot}>
      {label && <label className={labelText} htmlFor={id || name || label}>
        {label}
      </label>}
      {error && <div className={labelRight}>
        {error}
      </div>}
    </div>
    <div>
      <input
        type="password"
        id={id || name || label}
        name={name || id || label}
        ref={ref}
        placeholder={placeholder}
        className={root}
        onChange={handleChange}
        value={controlled ? value : innerValue}
        disabled={disabled}
        {...inputProps} 
      /> 
      {icon && <span className={iconClass} onClick={handleClick}></span>}
    </div>
  </div>
})

export default PasswordField
