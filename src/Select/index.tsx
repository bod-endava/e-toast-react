import React, { useState } from 'react';
import Option from './option';

export interface SelectProps {
  options?: any
}

const Select: React.FC<SelectProps> = ({options}) => {

  const [displayOptions,setDisplayOptions] = useState(false);
  const [defaultOption, setDefaultOption] = useState(options[0].value);
  
  const onSelectClick = () => displayOptions ? setDisplayOptions(false) : setDisplayOptions(true);

  const onOptionSelected = (index) => {    
    setDefaultOption(options[index].value);
    setDisplayOptions(false);
  }

  return(
    <>
      <div className={'eds-select eds-select__selected'}  onClick={onSelectClick}>{defaultOption}</div>
      <Option options={options} display={displayOptions} onSelected={onOptionSelected}></Option>
    </>
    
  ) 
}

export default Select
