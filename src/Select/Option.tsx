import React from 'react'
import getClassName from 'getclassname';

export interface OptionData {
  /**
   * Value used when option is selected. Required if neither text nor children are given.
   */
  value: string | number;
  /**
   * Text to be displayed. Defaults to `value` 
   */
  text: React.ReactNode;
  /**
   * Whether the option should be hidden or not. Defaults to false
   */
  hidden?: boolean
  /**
   * Event to trigger when an option is selected.
   */
  onClick?: (data: OptionData, event: React.MouseEvent<HTMLDivElement>) => void
}

type OptionProps = Partial<OptionData> & {
  /**
  * Content to be displayed. Defaults to `value` and has less priority than `text`
  */
  children?: React.ReactNode;
}

const Option: React.FC<OptionProps> = (props) => {
  const { onClick, children, ...info } = props;

  const root = getClassName({
    base: "eds-select__option",
    "&--hidden": info.hidden
  })

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => onClick?.({
    ...info,
    text: (info.text ?? info.value ?? children) as string | number,
    value: (info.value ?? info.text ?? children) as string | number
  }, e)

  return <div className={root} onClick={handleClick}>
    {info.text || children || info.value}
  </div>
}

export default Option;
  