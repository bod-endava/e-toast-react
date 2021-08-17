import { Meta, Story } from '@storybook/react'
import TextArea, { TextAreaProps } from '../src/TextArea'
import { booleanControl, noControl, textControl } from './shared/utils'

export default {
  title: "@e-toast/TextArea",
  component: TextArea,
  argTypes: {
    hasIcon: booleanControl(),
    icon: textControl(),
    id: textControl(),
    isDisabled: booleanControl(),
    label: textControl()
  }
} as Meta;

const Template: Story<TextAreaProps> = (args) => <TextArea {...args}/>

export const Normal = Template.bind({});
Normal.args = {};

export const NormalWithIcon = Template.bind({});
NormalWithIcon.args = {hasIcon: true, icon: "calendar"};

export const Disabled = Template.bind({});
Disabled.args = {isDisabled: true};

export const DisabledWithIcon = Template.bind({});
DisabledWithIcon.args = {hasIcon: true, icon: "calendar", isDisabled: true};

