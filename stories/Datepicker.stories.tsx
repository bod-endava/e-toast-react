import { Meta, Story } from '@storybook/react';
import Datepicker, { DatepickerProps } from '../src/Datepicker'
import { defaultMonthNames, defaultWeekdayNames } from '../src/Datepicker/date-utils';
import { extendControl, labels, noControl, objectControl, radioWithOptional } from './shared/utils';

const argTypes = {
  weekdays: objectControl(),
  months: objectControl(),
  formatDate: noControl(),
  onChange: noControl(),
  inputProps: objectControl()
}
export default {
  title: '@e-toast/Datepicker',
  component: Datepicker
} as Meta;

const Template: Story<DatepickerProps> = (args) => <Datepicker {...args} />;

export const Default = Template.bind({})
Default.args = {
  weekdays: defaultWeekdayNames,
  months: defaultMonthNames,
}
Default.argTypes = argTypes

export const ChangeNames = Template.bind({})
ChangeNames.args = {
  weekdays: ["Do","Lu","Ma","Mi","Ju","Vi","Sa"],
  months: [
    "Enero","Febrero","Marzo",
    "Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre",
    "Octubre","Noviembre","Diciembre"
  ]
}
ChangeNames.argTypes = argTypes

export const CustomFormatter: Story<{ formatter: string } & DatepickerProps> = ({ formatter, ...args }) => {
  const padded = x => x < 10 ? `0${x}` : `${x}`
  const formatDate = {
    "DD/MM/YY": (d: Date) => `${padded(d.getDate())}/${padded(d.getMonth() + 1)}/${d.getFullYear()%100}`,
    "MM/DD/YY": (d: Date) => `${padded(d.getMonth() + 1)}/${padded(d.getDate())}/${d.getFullYear()%100}`, 
    "DD/MM/YYYY": (d: Date) => `${padded(d.getDate())}/${padded(d.getMonth() + 1)}/${d.getFullYear()}`,
    "YYYY-MM-DD": (d: Date) => `${d.getFullYear()}-${padded(d.getMonth() + 1)}-${padded(d.getDate())}`
  }[formatter]
  return <Datepicker formatDate={formatDate} {...args} />
}

CustomFormatter.parameters = { controls: { include: ['formatter'] } };
CustomFormatter.argTypes = {
  formatter: extendControl(
    radioWithOptional([ "DD/MM/YY", "MM/DD/YY", "DD/MM/YYYY", "YYYY-MM-DD" ]),
    labels({
      undefined: `No Formatter (undefined)`,
      "DD/MM/YY": `(Date) => DD/MM/YY`, 
      "MM/DD/YY": `(Date) => MM/DD/YY`, 
      "DD/MM/YYYY": `(Date) => DD/MM/YYYY`,
      "YYYY-MM-DD": `(Date) => YYYY-MM-DD`,
    })
  ),
  weekdays: { control: { disable: true }},
  months: { control: { disable: true }},
  formatDate: { control: { disable: true }},
  onChange: { control: { disable: true }},
  inputProps: { control: { disable: true }},
}