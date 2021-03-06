import React from 'react';
import getClassName from 'getclassname';
import { Icons } from "../../commons/stories/Icons.types"
import { Sizes } from "../../commons/stories/Sizes.types"
import { FormAPI } from '../Form/API';
import { ButtonVariants } from './Button.types'

interface ButtonPropsWithoutRef {
  /**
   * Button content as text. Required if children are not present
   */
  label?: string;
  /**
   * Button content. Required if label is not present
   */
  children?: React.ReactNode;
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  /**
   * **This prop is only used for automatic form handling**
   * Type of button used to decide how to hook button to form state. Defaults to submit.
   * Passing none will prevent the button from triggering a form event.
   */
  type?: "submit" | "reset" | "none";
  /**
   * **This prop is only used for automatic form handling should not be used directly**
   * Form API object used to hook button to form state. Normally, this prop is passed automatically by the form.
   */
  formAPI?: FormAPI<any>;
  /**
   * Optional icon
   */
  icon?: Icons;
  /**
   * Optional Size of the button
   */
  size?: Sizes;
  /**
   * Optional Button styling
   */
  variant?: ButtonVariants;
  /**
   * Optional props to pass to the underlying button component
   */
  buttonProps?: React.ComponentPropsWithoutRef<"button">;
  /**
   * Optional callback to call on click
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export type ButtonProps = ButtonPropsWithoutRef & { 
  /**
   * Ref to the inner button component
   */
  ref?: React.ForwardedRef<HTMLButtonElement> 
}
export type ButtonInnerElement = HTMLButtonElement;

const Button: React.FC<ButtonProps> = React.forwardRef<ButtonInnerElement, ButtonPropsWithoutRef>(({ 
  label,
  children,
  icon,
  size,
  type="submit",
  formAPI,
  variant="primary",
  disabled=false,
  buttonProps={},
  onClick=()=>{}
}, ref) => {

  const handleClick = (e) => {
    e?.preventDefault?.();
    if( type !== "none" ){
      type === "submit" ? formAPI?.handleSubmit?.(e) : formAPI?.handleReset?.(e)
    }
    onClick(e);
  }

  const cl = getClassName({
    base: `eds-${variant}-button`,
    [`eds-button-${size}`]: Boolean(size),
    [`icon-${icon}`]: Boolean(icon),
  })

  return <button ref={ref} className={cl} disabled={disabled} onClick={handleClick} {...buttonProps} >
    {label || children}
  </button>
})

export default Button;