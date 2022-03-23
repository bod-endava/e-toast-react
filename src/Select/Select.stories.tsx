import React from 'react';
import { Story, Meta } from '@storybook/react';
import Select, { SelectProps } from '.';
import {
    objectControl,
    noControl,
    booleanControl,
    textControl
}from '../../stories/utils'
  
  export default {
    title: '@e-toast/Select',
    component: Select,
    argTypes: {
      options: objectControl,
      onChange: noControl(),
      disabled: booleanControl(),
      selected: textControl(),    
    }
  } as Meta;  

const Template: Story<SelectProps> = (args) => <Select {...args}/>

export const Controlled = Template.bind({})
Controlled.args = {
  selected: 'Medium',
  onChange: () => {},
  disabled: false,
  options: ['Small', 'Medium', 'Large'],
}

export const Uncontrolled = Template.bind({})
Uncontrolled.args = {
  options: ['Small', 'Medium', 'Large']
}