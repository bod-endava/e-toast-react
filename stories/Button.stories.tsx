import React from 'react';
import { Story, Meta } from '@storybook/react';
import Button , { ButtonProps } from '../src/Button';
import { ButtonVariants } from './shared/ButtonOptions'
import { Sizes, Icons } from './shared/IconOptions'
import {
  selectWithOptional,
  radioWithOptional,
  noControl,
  textControl,
  objectControl,
  booleanControl
} from './shared/utils'

export default {
  title: '@e-toast/Button',
  component: Button,
  argTypes: {
    label: textControl(),
    variant: selectWithOptional(ButtonVariants),
    icon: selectWithOptional(Icons),
    size: radioWithOptional(Sizes),
    disabled: booleanControl(),
    buttonProps: objectControl(),
    ref: noControl(),
    children: noControl(),
    onClick: noControl(),
  }
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  label: 'Button',
};

export const Cta = Template.bind({});
Cta.args = {
  variant: "cta",
  label: 'Button',
};

export const Text = Template.bind({});
Text.args = {
  variant: "text",
  label: 'Button',
};

export const Icon = Template.bind({});
Icon.args = {
  variant: "icon",
  icon: "add",
  label: 'Button',
};
