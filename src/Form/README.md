# Form

<hr>

Component for form state handling. Automatically hooks up children form components (like inputs, button, checkboxes) and allows hooking up custom components through children as function pattern. All @e-toast/react form components can automatically be hooked up to form state. Also, the FieldContainer component can be used as a proxy for when the form has more complex style or hierachy.

#### Import

```js
import { Form } from '@e-toast/react';
//or
import Form from '@e-toast/react/lib/Form';
```

#### Usage

```jsx
<Form
  initialValues={{ name: "" }}
  onSubmit={({ name }) => console.log(`My name is ${name}`)}
>
  <TextField name="name" />
  <Button type="submit" label="Done" />
</Form>
// Or in children as function form
<Form
  initialValues={{ name: "" }}
  onSubmit={({ name }) => console.log(`My name is ${name}`)}
>
  {(api) => <>
      <TextField name="name" onChange={api.handleChange}/>
      <Button type="submit" label="Done" onClick={api.handleSubmit}/>
    </>
  }
</Form>
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
      <td>FormAPI</td>
      <td>
      <pre><code>interface FormAPI&ltT&gt {
  handleChange: (e: React.ChangeEvent&ltany&gt) => void;
  handleSubmit: (e?: React.MouseEvent) => void;
  handleReset: (e?: React.MouseEvent) => void;
  setField: &ltK extends keyof T&gt(field: K, value: T[K]) => void;
  getField: &ltK extends keyof T&gt(field: K) => T[K];
  initialValues: T;
  values: T;
}</code></pre>
      </td>
      <td>
        An object to interact with the form state. 
      </td>
    </tr>
  </tobody>
</table>

#### Optional props

| Name         | Type       | Default    | Description               |
| ------------ | ---------- | ---------- | ------------------------- |
| onChange      | `(values: T, trigger?: string) => void;` | `undefined` | Change event handler. The first argument is the state. The second argument is what field triggered the change |
| onSubmit      | `(values: T) => void;` | `undefined` | Submit event handler. Receives the form state |
| initialValues | `object` | `{}` | Initial form values |
| formProps     | `object` | `{}` | Props to be passed to the underlying form component |
| children      | `((api: FormAPI<T>) => React.ReactNode) \| React.ReactNode` | `undefined` |  Form content to render. If React nodes are passed it will automatically hook immediate compatible children components by passing the value, checked, initialValue and formAPI as props. A child is detected as compatible if it is a etoast form component or if the type has the toasty attibute set to true. If it is a function, it will render the result of calling said function using formAPI as parameter |
