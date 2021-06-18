import React from 'react';
import getClassName from 'getclassname';

export interface TagProps {
  disabled?: boolean;
  id?: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  tabIndex: string;
}

const Tag: React.FC<TagProps> = ((
  {
    label,
  }
) => {
  const cl = getClassName({ base: "eds-tags" })
  const clSuffix = cl.extend('&__tag')

  return (
    <div className={cl}>
      <div className={clSuffix}>
        {label}
      </div>
    </div>
  )
});

export default Tag;
