import React from 'react';
import getClassName from 'getclassname';

export interface TextAreaProps {
  hasIcon?: boolean;
  icon?: string
  id?: string;
  isDisabled:boolean;
  label?: string;
  name?: string;
}

const Padded = ({ children }) => <div style={{margin: "16px"}}> {children} </div>;

const TextArea = (
  { 
    hasIcon = false,
    icon = "calendar",
    id = "id",
    isDisabled = false,
    label = "Placeholder",
    name = "normal",
  }
: TextAreaProps) => {
  const clTextArea = getClassName({
    base: "eds-outline-textarea",
    "&--has-icon": hasIcon,
  });

  const clIcon = getClassName({
    base: "eds-icon",
  });

  const clTextAreaIcon = getClassName({
    base: "eds-outline-textarea__icon",
  });

  return (
    <section>
      <Padded>
        <div className={`${clTextArea}__container`}>
          <textarea 
            className={clTextArea}
            disabled={isDisabled}
            name={id || name}
            placeholder={label}
          />
          <span className={`${clIcon} ${clTextAreaIcon} ${icon}`}></span>
        </div>
      </Padded>
    </section>
  )
}

export default TextArea;

