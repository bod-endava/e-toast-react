import React from 'react';
import getClassName from 'getclassname';

export interface TextAreaProps {
  name: string;
  variant?: string;
  hasIcon?: boolean;
  textAreaProps?: React.ComponentPropsWithoutRef<"div">;
}

const TextArea = ({ name = "normal", variant = "outline", hasIcon = false, textAreaProps = {} }: TextAreaProps) => {
  const clTextArea = getClassName({
    base: "eds-outline-textarea",
  });

  const clTextAreaIcon = getClassName({
    base: "eds-icon"
  })

  return (

  <div>TextArea</div>
  )
}

export default TextArea
