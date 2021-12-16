import React from "react";
import { Story, Meta } from "@storybook/react";
import Tag, { TagProps } from ".";

export default {
  title: "@e-toast/Tag",
  component: Tag,
  argTypes: {},
} as Meta;

const Template: Story<TagProps> = (args) => <Tag {...args} />;

export const Default = Template.bind({});

Default.args = {
  label: "Tag",
};

export const TagWithCloseAction = Template.bind({});
TagWithCloseAction.args = {
  label: "Tag with close",
  hasCloseAction: true,
};

export const TagDisabled = Template.bind({});
TagDisabled.args = {
  label: "Tag disabled",
  isDisabled: true,
};

export const TagList = Template.bind({});

TagList.args = {
  label: "TagList",
};
