import { Meta, Story } from '@storybook/react'
import TextArea, { TextAreaProps } from '.'
import { booleanControl, noControl, textControl } from '../shared/utils'

export default {
  title: "@e-toast/TextArea",
  component: TextArea,
  argTypes: {
    icon: textControl(),
    id: textControl(),
    isDisabled: booleanControl(),
    name: textControl(),
    label: textControl(),
    variant: textControl(),
  }
} as Meta;

const Template: Story<TextAreaProps> = (args) => <TextArea {...args}/>

export const Normal = Template.bind({});
Normal.args = {variant: "Outline"};

export const NormalWithIcon = Template.bind({});
NormalWithIcon.args = { icon: "calendar", variant: "Outline"};

export const Disabled = Template.bind({});
Disabled.args = { isDisabled: true, variant: "Outline" };

export const DisabledWithIcon = Template.bind({});
DisabledWithIcon.args = { icon: "calendar", isDisabled: true, variant: "Outline"};

