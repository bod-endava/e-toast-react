# Checkbox

<hr>

The checkbox is shown as a square box that is ticked (checked) when activated. Checkboxes are used to let a user select one or more options of a limited number of choices.

#### Import

```js
import { Checkbox } from '@e-toast/react';
//or
import Checkbox from '@e-toast/react/lib/Checkbox';
```

#### Usage

```jsx
<Checkbox id="checkbox" onChange={e => console.log(e.target.checked)}>Hi there I'm a checkbox!</Checkbox>
//or
<Checkbox id="checkbox" label="Hi there I'm a checkbox!" onChange={e => console.log(e.target.checked)}/>
```

#### Required props

| Name       | Type   | Description                 |
| ---------- | ------ | --------------------------- |
| label      | `string` | text to be used for the checkbox. Required if no children is provided |
| children   | `React.Node` | label content to be used for the checkbox. Required if no label is provided |

#### Optional props

| Name         | Type       | Default    | Description               |
| ------------ | ---------- | ---------- | ------------------------- |
| id | `string` | label | id of the input. If not passed, it will fallback to the label |
| disabled | `boolean` | | Whether the checkbox is disabled or not |
| checked  | `boolean` | | Whether the checkbox is checked or not.If `undefined` is passed, the prop will be ignored. Passing something other than undefined will cause the component to behave like a controlled component |
| initialValue | `boolean` | `false` | The initial value of the checkbox |
| onChange | `function` | `() => {}` | What to do when the checkbox is clicked |
| inputProps | `object` | `{ }` | Props to be passed down to the underlying input |
| labelProps | `object` | `{ }` | Props to be passed down to the underlying label |
| containerProps | `object` | `{ }` | Props to be passed down to the underlying div container |
| ref      | `React.ForwardedRef<HTMLInputElement>` | | Ref for the underlying input component |
