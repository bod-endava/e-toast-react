import { Meta, Story } from '@storybook/react';
import NativeDatepicker, { NativeDatepickerProps } from '../src/NativeDatepicker'
import { description, extendControl, objectControl } from './shared/utils';

export default {
  title: '@e-toast/NativeDatepicker',
  component: NativeDatepicker,
  argTypes: {}
} as Meta;

const Template: Story<{ props: NativeDatepickerProps }> = ({ props }) => <NativeDatepicker {...props} />;

export const Default = Template.bind({});
Default.args = {
  props: {
    name: "Date",
    id: "Some_Date",
  }
}
Default.argTypes = {
  props: extendControl(
    objectControl(),
    description("Receives the same props as an input element")
  )
}
