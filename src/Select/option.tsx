import React from 'react'

interface data{
  value:string
}

export interface OptionProps {
  options?: any,
  display?: boolean,
  onSelected?: (index:number) => void
}

const Option: React.FC<OptionProps> = ({options, display, onSelected}) => {

  let optionsArray = Object.keys(options).map(index => {
    const option = options[index];
    return option;
  })

  const onClickOption = (event) => {   
    onSelected(event.target.dataset.index);        
  }
  
  return(
    <div className={display ? 'eds-select__list eds-select__list--open' : 'eds-select__list'}>     
      {        
        optionsArray.map((datos:data, index:number) => 
          <div key={index} className='eds-select__option' data-index={index} onClick={onClickOption}>{datos.value}</div>
        )
      }      
    </div>    
  ) 
}

export default Option;
  