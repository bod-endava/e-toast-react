import React from 'react';
import getClassName from 'getclassname';

interface CheckboxPropsWithoutRef {
  /**
   * id of the input. If not passed, it will fallback to the label
   */
  id?: string;
  /**
   * text to be used for the checkbox. Required if no children is provided
   */
  label?: string;
  /**
   * label content to be used for the checkbox. Required if no label is provided
   */
  children?: React.ReactNode;
  /**
   * Whether the checkbox is disabled or not
   */
  disabled?: boolean;
  /**
   * Whether the checkbox is checked or not. If `undefined` is passed, the prop 
   * will be ignored. Passing something other than undefined will cause the 
   * component to behave like a controlled component
   */
  checked?: boolean;
  /**
   * The initial value of the checkbox
   */
  initialValue?: boolean;
  /**
   * What to do when the checkbox is clicked
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Props to be passed down to the underlying input
   */
  inputProps?: React.ComponentPropsWithoutRef<"input">;
  /**
   * Props to be passed down to the underlying label
   */
  labelProps?: React.ComponentPropsWithoutRef<"label">;
  /**
   * Props to be passed down to the underlying div container
   */
  containerProps?: React.ComponentPropsWithoutRef<"div">;
}

export type CheckboxProps = CheckboxPropsWithoutRef & {
  /**
   * Ref to the inner input component
   */
  ref?: React.ForwardedRef<HTMLInputElement>;
}
export type CheckboxInnerElement = HTMLInputElement

const Checkbox = React.forwardRef<CheckboxInnerElement, CheckboxPropsWithoutRef>(({
  label,
  children,
  id: rawId,
  checked,
  disabled=false,
  initialValue=false,
  onChange=()=>{},
  inputProps={},
  labelProps={},
  containerProps={}
}, ref) => {

  const controlled = checked !== undefined;
  const [innerChecked, setInnerChecked] = React.useState(initialValue)
  const id = rawId || label;

  const handleChange = (e) => {
    onChange?.(e);
    !controlled && setInnerChecked(ckd => !ckd);
  }

  const cl = getClassName({ base: "eds-checkbox" })
  const labelCl = cl.extend('&__label').recompute({ "&--disabled": disabled })
  const containerCl = cl.extend("&__container");

  return <div className={containerCl} {...containerProps}>
    <input 
      id={id} 
      className={cl} 
      type="checkbox" 
      ref={ref} 
      disabled={disabled}
      checked={controlled ? checked : innerChecked } 
      onChange={handleChange} 
      {...inputProps}
    />
    <label htmlFor={id} className={labelCl} {...labelProps}>{label || children}</label>
  </div>
})

export default Checkbox
