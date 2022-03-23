import React from 'react';
import { Story, Meta } from '@storybook/react';
import Avatar , { AvatarProps } from './Avatar';
import { textControl, colorControl, noControl, objectControl } from '../../stories/utils';

export default {
  title: "@e-toast/Avatar",
  component: Avatar,
  argTypes: {
    label: textControl(),
    fill: colorControl(),
    divProps: objectControl(),
    formatter: noControl(),
    onClick: noControl(),
  },
  parameters: {
    controls: {
      presetColors: [
        { title: "Default (primary-mid)", color: "var(--orange-mid)" },
        { title: "Example Hex", color: "#ff0" },
        { title: "Example Named", color: "yellow" },
      ]
    }
  }
} as Meta;

const Template: Story<AvatarProps> = (args) => <Avatar {...args}/>
export const Default = Template.bind({})
Default.args = {
  label: "Avatar",
  fill: ""
}