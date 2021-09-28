import React from 'react';
import getClassName from 'getclassname';

export interface TextAreaProps {
  /**
   * The `icon` attribute to indicate if the text area should display an icon
   */
  icon?: string
  /**
   * The `id` attribute to be passed to the text area component
   */
  id?: string;
  /**
   * The `isDisabled` attribute to indicate if the text area should disabled
   */
  isDisabled: boolean;
  /**
   * The `label` attribute will be used as placeholder
   */
  label?: string;
  /**
   * The `name` attribute is defined for the texarea element
   */
  name?: string;
  /**
   * The `variant` attribute determines the style of the text area. Outline is
   * the default value
   */
  variant?: string;
}

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
    </section>
  )
}

export default TextArea;

