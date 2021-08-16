import { Meta, Story } from '@storybook/react'
import TextArea, { TextAreaProps } from '../src/TextArea'
import { noControl, textControl } from './shared/utils'

export default {
  title: "@e-toast/TextArea",
  component: TextArea,
  argTypes: {
    id: textControl(),
    label: textControl()
  }
} as Meta;

const Template: Story<TextAreaProps> = (args) => <TextArea {...args}/>

export const Basic = Template.bind({});
Basic.args = {};

export const Disabled = Template.bind({});
Disabled.args = {isDisabled: true};
