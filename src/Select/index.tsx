import React, { useEffect, useState } from 'react';
import Option from './option';


export interface SelectProps {
  /** 
  * Array with elements Select will display as a list
  */
  options?: any,
   /**
   * onChange event handler. Triggers when an option is selected
   */
    onChange: React.ChangeEventHandler<HTMLDivElement>
}

const Select: React.FC<SelectProps> = ({
  options,
  onChange
}) => {

  const [displayOptions,setDisplayOptions] = useState(false);
  const [defaultOption, setDefaultOption] = useState(options[0]);
  const [iconClass,setIconClass] = useState('eds-select__selected__arrow__icon');
  
  const onSelectClick = () => {
    displayOptions ? setDisplayOptions(false) : setDisplayOptions(true);    
  }

  const onOptionSelected = (event) => {    
    setDefaultOption(options[event.target.dataset.index]);
    setDisplayOptions(false);
    onChange(event);
  }

  useEffect(() => {
    if(displayOptions){
      setIconClass('eds-select__selected__arrow__icon eds-select__selected__arrow__icon--open');
    }else{
      setIconClass('eds-select__selected__arrow__icon');
    }
  },[displayOptions])

  return(
    <>
      <div className={'eds-select eds-select__selected'} onClick={onSelectClick}>
        <p className='eds-select__selected__content' id='selectDefaultOption'>{defaultOption}</p>
        <span className='eds-select__selected__arrow'></span>    
        <span className={iconClass}></span>
      </div>
      <Option options={options} display={displayOptions} onSelected={onOptionSelected}></Option>
    </>
    
  ) 
}

export default Select
