import React from 'react';
import getClassName from 'getclassname';

export interface TextAreaProps {

  id?: string;
  isDisabled:boolean;
  name?: string;
  hasIcon?: boolean;
}

const Padded = ({ children }) => <div style={{margin: "16px"}}> {children} </div>;

const TextArea = (
  { 
    id = "id",
    name = "normal",
    isDisabled = false,
    hasIcon = false,
  }
: TextAreaProps) => {
  const clTextArea = getClassName({
    base: "eds-outline-textarea",
    "&--has-icon": hasIcon,
  });

  const clTextAreaIcon = getClassName({
    base: "eds-icon"
  })

  return (
    <section>
      <Padded>
        <div className={`${clTextArea}__container`}>
          <textarea 
            className={clTextArea}
            disabled={isDisabled}
            name={id || name}
          />
          <span className={`${clTextAreaIcon}`}></span>
        </div>
      </Padded>
      TextArea
    </section>
  )
}

export default TextArea;

