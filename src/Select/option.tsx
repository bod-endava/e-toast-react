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
    <ul style={{visibility: display? 'visible' : 'hidden', border:'solid red'}}>     
      {        
        optionsArray.map((datos:data, index:number) => 
          <li key={index} data-index={index} onClick={onClickOption}>{datos.value}</li>
        )
      }      
    </ul>    
  ) 
}

export default Option;
  