import React from 'react'

interface data{
  value:string
}

export interface OptionProps {
  options?: any,
  display?: boolean,
  onSelected: React.ChangeEventHandler<HTMLDivElement>
}

const Option: React.FC<OptionProps> = ({options, display, onSelected}) => {

  const onClickOption = (event) => {   
    onSelected(event);        
  }
  
  return(
    <div className={display ? 'eds-select__list eds-select__list--open' : 'eds-select__list'}>     
      {   
        options.map((datos:data, index:number) =>
          <div key={index} className='eds-select__option' data-index={index} onClick={onClickOption}>{datos}</div>
        )
      }      
    </div>    
  ) 
}

export default Option;
  