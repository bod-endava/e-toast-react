import type React from 'react';

export interface TestProps {
  required: any;
  optional?: any;
}

const Test = ({ required, optional="defaultValue" }: TestProps) => {

  return <div>Test</div>
}

export default Test
