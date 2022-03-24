# FieldContainer

<hr>

This component is used to hook up form components to a form without having the limitation of having to be a direct child of the form. It works as a consumer of the FormAPIContext and does the exact same tranformation to children as a Form component. It hooks up to the nearest parent Form component.

#### Import

```js
import { FieldContainer } from '@e-toast/react';
//or
import FieldContainer from '@e-toast/react/lib/FieldContainer';
```

#### Usage

```jsx
<Form
  initialValues={{ name: "" }}
  onSubmit={({ name }) => console.log(`My name is ${name}`)}
>
  <div>
    <FieldContainer as={FlexLayout} >
      <TextField name="name" />
      <Button type="submit" label="Done" />
    </FieldContainer>
  <div>
</Form>
```

#### Required props

| Name       | Type   | Description                 |
| ---------- | ------ | --------------------------- |
| children   | ((api: FormAPI\<any\>) => React.ReactNode) \| React.ReactNode | Form content to render. If React nodes are passed it will automatically hook immediate children components by passing the formAPI prop. If it is a function, it will render the result of calling said function using formAPI as parameter. |

#### Optional props

| Name         | Type       | Default    | Description               |
| ------------ | ---------- | ---------- | ------------------------- |
| as             | React.ElementType\<any\> | `"div"` |  Component used as container. |
| componentProps | any                    | `{}`    | Props to be passed to the component used as container |