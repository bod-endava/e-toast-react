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

With option data objects:

```jsx
<Select 
  options={[
      { text: 'Small', value: "S" },
      { text: 'Medium', value: "M" },
      { text: 'Large', value: "L" },
    ]}
  />
```

Declarative:

```jsx
<Select>
    <Select.Option value="S">Small</Select.Option>
    <Select.Option value="M">Medium</Select.Option>
    <Select.Option value="L">Large</Select.Option>
</Select>
```

#### Local Type Definitions

<table>
  <thead>
    <th>Name</th>
    <th>Definition</th>
    <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td>OptionData</td>
      <td>
      <pre><code>interface OptionData {
  value: string | number;
  text: React.ReactNode;
  hidden?: boolean;
  onClick?: (data: OptionData, event: React.MouseEvent<HTMLDivElement>) => void;
}</code></pre>
      </td>
      <td>
        An object containing information of a select option
      </td>
    </tr>
  </tobody>
</table>

#### Optional props

| Name         | Type       | Default    | Description               |
| ------------ | ---------- | ---------- | ------------------------- |
| options   | `string[] | OptionData[]` | `[]` | Array with elements to be displayed |
| id   | `string` | `''` | unique id of the select. Used if no name is supplied |
| name   | `string` | `''` | name of the field the select represents. |
| disabled  | `boolean` | `false` | Disable the interaction with the select |
| selected  | `string | number` | `''` | Sets the current selected value |
| initialValue  | `string | number` | `''` | Sets the initial selected value. Ignored if selected is passed |
| children  | `ReactNode` | `[]` | Options to be displayed. Required if no options prop is passed. Must be Select.Option components |
| FormAPI  | `FormAPI<any>` | `undefined` | Form API object used to hook select to form state. Normally, this prop is passed automatically by the form. |
| divProps  | `ComponentPropsWithoutRef<"div">` | `{}` | Props passed down to the underlying div component |
| onChange | `OpaqueEventHandler<number | string>` | onChange event handler triggered when an option is selected. It receives an opaque event structure, not the react synthetic event. it guarantees target.value and target.name match the select props and integration with the Form component.