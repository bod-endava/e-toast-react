import { Meta, Story } from '@storybook/react';
import Datepicker, { DatepickerProps } from './Datepicker'
import {
  labels,
  noControl,
  textControl,
  objectControl,
  extendControl,
  booleanControl,
  disableControl,
  radioWithOptional
} from '../../commons/stories/utils';

const argTypes = {
  initialValue: textControl(),
  id: textControl(),
  name: textControl(),
  label: textControl(),
  disabled: booleanControl(),
  weekdays: objectControl(),
  months: objectControl(),
  formatDate: textControl(),
  placeholder: textControl(),
  onChange: noControl(),
  inputProps: objectControl()
}
export default {
  title: '@e-toast/Datepicker',
  component: Datepicker
} as Meta;

const Template: Story<DatepickerProps> = (args) => <Datepicker {...args} />;

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = argTypes

export const ChangeNames = Template.bind({})
ChangeNames.args = {
  weekdays: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
  months: [
    "Enero", "Febrero", "Marzo",
    "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre",
    "Octubre", "Noviembre", "Diciembre"
  ]
}
ChangeNames.argTypes = argTypes

export const WithInitialValue = Template.bind({})
WithInitialValue.args = { initialValue: new Date }
WithInitialValue.argTypes = argTypes

export const WithLabel = Template.bind({})
WithLabel.args = { label: "With Label" }
WithLabel.argTypes = argTypes

export const CustomFormatter: Story<DatepickerProps> = (args) => <Datepicker {...args} />
CustomFormatter.args = {}
CustomFormatter.parameters = { controls: { include: ['format', 'onChange'] } };
CustomFormatter.argTypes = {
  format: extendControl(
    radioWithOptional(["DD/MM/YY", "MM/DD/YY", "DD/MM/YYYY", "YYYY-MM-DD", "Year: YYYY", "YYYYy MMm DDd"]),
    labels({
      undefined: `No Formatter (undefined, defaults to DD/MM/YY)`,
    })
  ),
  id: textControl(),
  name: textControl(),
  label: textControl(),
  disabled: booleanControl(),
  onChange: noControl(),
  initialValue: disableControl(),
  placeholder: disableControl(),
  weekdays: disableControl(),
  months: disableControl(),
  formatDate: disableControl(),
  inputProps: disableControl(),
}
