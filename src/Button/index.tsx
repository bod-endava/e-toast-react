import React from 'react';
import getClassName from 'getclassname';
import { Icons, Sizes } from "../sharedTypes"

export type ButtonVariants = "primary" | "outline" | "cta" | "text" | "icon"

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
  variant="primary",
  disabled=false,
  buttonProps={},
  onClick=()=>{}
}, ref) => {

  const cl = getClassName({
    base: `eds-${variant}-button`,
    [`eds-button-${size}`]: Boolean(size),
    [`icon-${icon}`]: Boolean(icon),
  })

  return <button ref={ref} className={cl} disabled={disabled} onClick={onClick} {...buttonProps} >
    {label || children}
  </button>
})

export default Button