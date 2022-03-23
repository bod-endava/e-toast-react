import { Meta, Story } from '@storybook/react'
import TextField, { TextFieldProps } from './TextField'
import { Icons } from '../../stories/IconOptions'
import {
  noControl,
  textControl,
  objectControl,
  booleanControl,
  selectWithOptional,
} from '../../stories/utils'

export default {
  title: "@e-toast/TextField",
  component: TextField,
  argTypes: {
    id: textControl(),
    label: textControl(),
    name: textControl(),
    icon: selectWithOptional(Icons),
    error: textControl(),
    success: booleanControl(),
    disabled: booleanControl(),
    inputProps: objectControl(),
    placeholder: textControl(),
    value: textControl(),
    initialValue: textControl(),
    onChange: noControl(),
    onIconClick: noControl()
  }
} as Meta

const Template: Story<TextFieldProps> = (args) => <TextField {...args} />

export const Controlled = Template.bind({})
Controlled.args = {
  value: "Some value"
}

export const Uncontrolled = Template.bind({})
Uncontrolled.args = {}