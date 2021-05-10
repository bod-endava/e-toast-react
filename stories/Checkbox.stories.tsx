import React from 'react';
import { Story, Meta } from '@storybook/react';
import Checkbox , { CheckboxProps } from '../src/Checkbox';
import { 
  radioWithOptional, 
  noControl, 
  textControl, 
  objectControl, 
  booleanControl 
} from './shared/utils'

export default {
  title: '@e-toast/Checkbox',
  component: Checkbox,
  argTypes: {
    id: textControl(),
    label: textControl(),
    disabled: booleanControl(),
    initialValue: booleanControl(),
    checked: radioWithOptional([ true, false ]),
    inputProps: objectControl(),
    labelProps: objectControl(),
    containerProps: objectControl(),
    ref: noControl(),
    children: noControl(),
    onChange: noControl(),
  }
} as Meta;

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />

export const Controlled = Template.bind({});
Controlled.args = {
  label: "Checkbox",
  checked: true,
}

export const Uncontrolled = Template.bind({});
Uncontrolled.args = {
  label: "Checkbox",
}