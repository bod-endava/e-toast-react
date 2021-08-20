import React from 'react';
import getClassName from 'getclassname';

export interface TextAreaProps {
  icon?: string
  id?: string;
  isDisabled: boolean;
  label?: string;
  name?: string;
  variant?: string;
}

const Padded = ({ children }) => <div style={{margin: "16px"}}> {children} </div>;

const TextArea = (
  { 
    icon = "",
    id = "id",
    isDisabled = false,
    label = "Placeholder",
    name = "normal",
    variant = "Outline",
  }
: TextAreaProps) => {
  const hasIcon = Boolean(icon);
  const clTextArea = getClassName({
    base: "eds-outline-textarea",
  });

  const clIcon = getClassName({
    base: "eds-icon",
  });

  const clTextAreaIcon = clTextArea.extend("&__icon");

  return (
    <section>
      <Padded>
        <div className={hasIcon ? `${clTextArea}--has-icon ${clTextArea}__container` : `${clTextArea}__container`}>
          <textarea 
            className={hasIcon ? `${clTextArea}--has-icon ${clTextArea}` : clTextArea}
            disabled={isDisabled}
            name={id || name}
            icon={icon}
            placeholder={label}
            variant={variant}
          />
          <span className={hasIcon ? `${clIcon} ${clTextAreaIcon} ${icon}` : `${icon}`}></span>
        </div>
      </Padded>
    </section>
  )
}

export default TextArea;

