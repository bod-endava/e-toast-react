import React from 'react';

type NativeDatepickerPropsWithoutRef = React.ComponentPropsWithoutRef<"input">

export type NativeDatepickerProps = NativeDatepickerPropsWithoutRef & {
  /**
   * Ref to the inner input component
   */
  ref?: React.ForwardedRef<HTMLInputElement>;
}
export type NativeDatepickerInnerElement = HTMLInputElement

/**
 * Simple native datepicker. Behaves the same as writing `<input type="date" className="eds-datepicker-native" />`
 */
const NativeDatepicker = React.forwardRef<NativeDatepickerInnerElement, NativeDatepickerPropsWithoutRef>((props, ref) => {
  return <input
    type="date"
    className="eds-datepicker-native"
    ref={ref}
    {...props} 
  />
})

export default NativeDatepicker
