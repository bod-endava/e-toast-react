import React, { useEffect, useState } from 'react';
import Option from './option';

export interface SelectProps {
  /** 
  * Array with elements Select will display as a list
  */
  options?: any
}

const Select: React.FC<SelectProps> = ({options}) => {

  const [displayOptions,setDisplayOptions] = useState(false);
  const [defaultOption, setDefaultOption] = useState(options[0]);
  const [iconClass,setIconClass] = useState('eds-select__selected__arrow__icon');
  
  const onSelectClick = () => {
    displayOptions ? setDisplayOptions(false) : setDisplayOptions(true);    
  }

  const onOptionSelected = (index) => {    
    setDefaultOption(options[index]);
    setDisplayOptions(false);
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
      <div className={'eds-select eds-select__selected'}  onClick={onSelectClick}><span className='eds-select__selected__content'>{defaultOption}</span><span className='eds-select__selected__arrow'></span><span className={iconClass}></span></div>
      <Option options={options} display={displayOptions} onSelected={onOptionSelected}></Option>
    </>
    
  ) 
}

export default Select
