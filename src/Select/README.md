# Select

<hr>

A component that works as an HTML select element

#### Import

```js
import { Select } from '@e-toast/react';
//or
import Select from '@e-toast/react/lib/Select';
```

#### Usage

```jsx
<Select options={['Small','Medium','Large']}/>
```

#### Local Type Definitions

| Name |  Definition | Description |
| ---- | ----------- | ----------- |

#### Required props

| Name       | Type   | Description                 |
| ---------- | ------ | --------------------------- |
| onChange | `function` | onChange event handler triggered when an option is selected. The index of the option selected within the options array is stored on event.target.dataset.index

#### Optional props

| Name         | Type       | Default    | Description               |
| ------------ | ---------- | ---------- | ------------------------- |
| options   | `array` | `['Small', 'Medium', 'Large']` | Array with elements to be displayed |
| disable   | `boolean` | `false` | Disable the interaction with the select |