import React from 'react';
import { Story, Meta } from '@storybook/react';
import Select, { SelectProps } from '../src/Select';
import {
    objectControl
}from './shared/utils'
  
  export default {
    title: '@e-toast/Select',
    component: Select,
    argTypes: {
      options: objectControl,      
    }
  } as Meta;
  

const Template: Story<SelectProps> = (args) => <Select {...args}/>

export const Default = Template.bind({});
Default.args = {
  options: {
    0:{
      value:'Small'
    },
    1:{
      value:'Medium'
    },
    2:{
      value:'Large'
    }
  }
};
