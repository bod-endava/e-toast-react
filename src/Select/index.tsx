import React, { useState } from 'react';
import getClassName from 'getclassname';
import Option from './option';

export interface SelectProps {
  /** 
  * Array with elements to be displayed
  */
  options?: any,
   /**
   * onChange event handler triggered when an option is selected. 
   * The index of the option selected within the options array is stored on event.target.dataset.index 
   */
    onChange: React.ChangeEventHandler<HTMLDivElement>,
    /**
   * Disable the interaction with the select. 
   */
    disabled?:boolean
    /**
   * Set the default option on the select. Selected has to be an item part of the options array, otherwise the 
   * first item of the array will be set as default.   
   */
    selected?: string;  
}

const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  disabled=false,
  selected
}) => {

  const controlled = selected !== undefined ? options.indexOf(selected) != -1 ? true : false : false;

  const [displayOptions,setDisplayOptions] = useState(false);
  const [defaultOption, setDefaultOption] = useState(controlled ? selected: options[0]);
  
  const selectClass = getClassName({
    base: 'eds-select eds-select__selected',
    '&__disabled': Boolean(disabled)   
  });

  const contentClass = getClassName({
    base: 'eds-select__selected__content',
    '&__disabled': Boolean(disabled)   
  });

  const iconClass = getClassName({
    base: 'eds-select__selected__arrow__icon',
    '&--open': Boolean(displayOptions),
    '&__disabled': Boolean(disabled)   
  });

  const onSelectClick = () => {
    if(!disabled){
      displayOptions ? setDisplayOptions(false) : setDisplayOptions(true);
    }    
  }

  const onOptionSelected = (event) => {    
    setDefaultOption(options[event.target.dataset.index]);
    setDisplayOptions(false);
    onChange(event);
  }

  return(
    <>
      <div className={selectClass} onClick={onSelectClick}>
        <p className={contentClass}>{defaultOption}</p>
        <span className='eds-select__selected__arrow'></span>    
        <span className={iconClass}></span>
      </div>
      <Option options={options} display={displayOptions} onSelected={onOptionSelected}></Option>
    </>
    
  ) 
}

export default Select
