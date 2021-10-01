# PasswordField

<hr>

A password input component. Uses an input element.

#### Import

```js
import { PasswordField } from '@e-toast/react';
//or
import PasswordField from '@e-toast/react/lib/PasswordField';
```

#### Usage

```jsx
function search(something){ ... }
let value = undefined

<PasswordField
  label="Some Password"
  icon="lock"
  onChange={(e) => value = e.target.value}
  onIconClick={() => search(value)}
/>
```

#### Optional props

| Name         | Type       | Default    | Description               |
| ------------ | ---------- | ---------- | ------------------------- |
| id           | `string`   | undefiend  | The `id` attribute to be passed to the underlying input element. Will default to `name`, then `label` props | 
| label        | `string`   | undefiend  | The `label` attribute to be passed to the underlying input element |
| name         | `string`   | undefiend  | The `name` attribute to be passed to the underlying input element. Will default to `id`, then `label` props |
| icon         | `Icons`    | undefiend  | Icon to be placed on the right of the input |
| error        | `string`   | undefiend  | Error to show, if any. If no error is intended then undefined should be passed |
| success      | `boolean`  | undefiend  | Whether the input is in success state |
| disabled     | `boolean`  | undefiend  | Whether the input is disabled |
| inputProps   | `object`   | undefiend  | Props to pass to the underlying input element |
| placeholder  | `string`   | undefiend  | The `placeholder` attribute to be passed to the underlying input element |
| value        | `string`   | undefiend  | Force a value on the input. If passed the input will behave as a controlled component. Otherwise will behave as an uncontrolled component |
| initialValue | `string`   | undefiend  | Initial value to be used for the input |
| onChange     | `React.ChangeEventHandler<HTMLInputElement>` | undefined | onChange event handler. Triggers on every change |
| onIconClick  | `React.MouseEventHandler<HTMLSpanElement>` | undefined | onClick event handler for the icon. If no icon is passed, this event will never trigger |
| ref          | `React.ForwardedRef<HTMLInputElement>` | undefined | Ref to the underlying input element |