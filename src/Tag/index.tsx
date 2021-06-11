import type React from 'react';

export interface TagProps {
  required: any;
  optional?: any;
}

const Tag = ({ required, optional="defaultValue" }: TagProps) => {

  return <div>Tag</div>
}

export default Tag
