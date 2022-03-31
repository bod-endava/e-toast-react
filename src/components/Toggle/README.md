# Toggle

<hr>

A Toggle input component. Uses an input element.

#### Import

```js
import { Toggle } from '@e-toast/react';
//or
import Toggle from '@e-toast/react/lib/TextField';
```

#### Controlled Usage

```jsx
function search(something){ ... }
let value = undefined

<Toggle
  label="Some Search"
  onChange={(e) => value = e.target.value}
  checked={value}
/>
```

#### Uncontrolled Usage

```jsx
function search(something){ ... }
let value = undefined

<Toggle
  label="Some Search"
  initialValue={false}
/>
```

#### Optional props

| Name         | Type       | Default   | Description                                                                                                                                                           |
|--------------| ---------- |-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| id           | `string`   | "" | The `id` attribute to be passed to the underlying input element. if component is using label and this prop is not passed, then the component will use the label as id | 
| label        | `string`   | undefiend | The `label` attribute to be passed to the underlying input element                                                                                                    |
| disabled     | `boolean`  | false     | Whether the input is disabled                                                                                                                                         |
| inputProps   | `object`   | undefiend | Props to pass to the underlying input element                                                                                                                         |
| labelProps   | `object`   | undefiend | Props to pass to the underlying label element                                                                                                                         |
| containerProps   | `object`   | undefiend | Props to pass to the underlying container element                                                                                                                     |
| checked      | `string`   | undefiend | Force a value on the input. If passed the input will behave as a controlled component. Otherwise will behave as an uncontrolled component                             |
| initialValue | `string`   | false     | Initial value to be used for the input                                                                                                                                |
| onChange     | `React.ChangeEventHandler<HTMLInputElement>` | undefined | onChange event handler. Triggers on every change                                                                                                                      |
| ref          | `React.ForwardedRef<HTMLInputElement>` | undefined | Ref to the underlying input element                                                                                                                                   |