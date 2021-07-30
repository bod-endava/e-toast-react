import React from 'react';
import { Story, Meta } from '@storybook/react';
import Select, { SelectProps } from '../src/Select';
import {
    objectControl,
    noControl,
    booleanControl,
}from './shared/utils'
  
  export default {
    title: '@e-toast/Select',
    component: Select,
    argTypes: {
      options: objectControl,
      onChange: noControl(),
      disabled: booleanControl(),    
    }
  } as Meta;
  

const Template: Story<SelectProps> = (args) => <Select {...args}/>

export const Default = Template.bind({});
Default.args = {
  options: ['Small', 'Medium', 'Large'] 
};
