import { Meta, Story } from '@storybook/react'
import PasswordField, { PasswordFieldProps } from '.'
import { Icons } from '../shared/IconOptions'
import { 
  noControl,
  textControl,
  objectControl,
  booleanControl,
  selectWithOptional,
} from '../shared/utils'

export default {
  title: "@e-toast/PasswordField",
  component: PasswordField,
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

const Template: Story<PasswordFieldProps> = (args) => <PasswordField {...args}/>

export const Controlled = Template.bind({})
Controlled.args = {
  value: "A password..."
}

export const Uncontrolled = Template.bind({})
Uncontrolled.args = {}