# Datepicker

<hr>

E-toast flavor of a datepicker. Has a limited set of features, including date formatting, interface for custom date formats, month and day i18n options, etc.

#### Import

```js
import { Datepicker } from '@e-toast/react';
//or
import Datepicker from '@e-toast/react/lib/Datepicker';
```

#### Usage

```jsx
<Datepicker 
  label="Birthday"
  format="DD-MM-YYYY"
  onChange={(text,date) => {
    if( date ){
      console.log(`Your birthday is ${text}`)
    } else {
      console.log(`I cannot figure out the date!`)
    }
  }}
/>
```

#### Local Type Definitions

| Name |  Definition | Description |
| ---- | ----------- | ----------- |
| WeekdayMapper | `string[] | ((n: number) => string)` | An array or function that maps the index of the day of the week to the abreviation to be used in the calendar. Days of the week are 0-indexed starting at Sunday as 0 |
| MonthMapper   | `string[] | ((n: number) => string)` | An array or function that maps the index of the month to the name to be used in the calendar. Months are 0-indexed starting at January as 0 |
| DateFormatter | `{ parseDate(str: string, format?: string): Date | undefined; formatDate(date: Date, format?: string): string; }` | A formatter object is an object with a "parseDate" and "formatDate" function. "parseDate" should either throw or return undefined when a date text is not a valid format. |

#### Optional props

| Name         | Type       | Default    | Description               |
| ------------ | ---------- | ---------- | ------------------------- |
| id           | `string`         | `undefined` | Id passed to the underlying input. Will default to label prop |
| name         | `string`         | `undefined` | Name passed to the underlying input. Will default to label prop |
| label        | `string`         | `undefined` | Text to be used as label for the datepicker |
| disabled     | `boolean`        | `undefined` | Whether the datepicker is disabled or not |
| initialValue | `string \| Date` | `undefined` | Initial value of the datepicker. If it is a string, it must be a valid date string representation. Defaults to current day if string is not a valid date |
| placeholder  | `string`         | `undefined` | placeholder to be used in the input |
| weekdays     | WeekdayMapper    | `["Su","Mo","Tu","We","Th","Fr","Sa"]`| An array or function that maps the index of the day of the week to the abreviation to be used in the calendar.Days of the week are 0-indexed starting at Sunday as 0. |
| months       | MonthMapper      | `["January","February","March","April","May","June","July","August","September","October","November","December"]`| An array or function that maps the index of the month to the name to be used in the calendar. Months are 0-indexed starting at January as 0. |
| format       | `string \| DateFormatter`                 | `DD/MM/YY` | Format string or formatter object to use to parse and format the text inside the input |
| onChange     | `(value: string, date?: Date) => void`    | `() => {}` | Handler for when the date changes. Receives raw text in the input and parsed date if value is valid date. Otherwise date will be undefined |
| inputProps   | `React.ComponentPropsWithoutRef<"input">` | `{}` | props to pass to the underlying input |
