import React, { useEffect, useState } from 'react';
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
}

const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  disabled=false
}) => {

  const [selectClass, setSelectClass] = useState('eds-select eds-select__selected');
  const [contentClass, setContentClass] = useState('eds-select__selected__content');
  const [displayOptions,setDisplayOptions] = useState(false);
  const [defaultOption, setDefaultOption] = useState(options[0]);
  const [iconClass,setIconClass] = useState('eds-select__selected__arrow__icon');
  
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

  useEffect(() => {
    if(disabled){
      setSelectClass('eds-select eds-select__selected eds-select__selected__disabled');
    }else{
      setSelectClass('eds-select eds-select__selected');
    }

  },[disabled])

  useEffect(() => {
    if(disabled){
      setContentClass('eds-select__selected__content__disabled');
    }else{
      setContentClass('eds-select__selected__content');
    }
  },[disabled])
  
  useEffect(() => {
    if(displayOptions){
      setIconClass('eds-select__selected__arrow__icon eds-select__selected__arrow__icon--open');
    }else{
      setIconClass('eds-select__selected__arrow__icon');
    }
  },[displayOptions])


  useEffect(() => {
    if(disabled){
      setIconClass('eds-select__selected__arrow__icon eds-select__selected__arrow__icon__disabled');
    }else{
      setIconClass('eds-select__selected__arrow__icon');
    }
  },[disabled])


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
