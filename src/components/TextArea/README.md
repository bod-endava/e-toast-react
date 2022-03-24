# TextArea

<hr>

A text area component.

#### Import

```js
import { TextArea } from '@e-toast/react';
//or
import TextArea from '@e-toast/react/lib/TextArea';
```

#### Usage

```jsx
<TextArea
  disabled=false
  name="a name"
  icon="calendar"
  placeholder="label"
  variant="outline"
/>
```

#### Optional props

| Name         | Type       | Default    | Description               |
| ------------ | ---------- | ---------- | ------------------------- |
| icon         | `string`       | `undefined`    | The `icon` attribute to indicate if the text area should display an icon               |
| id         | `string`       | `undefined`    | The `id` attribute to be passed to the text area component               |
| isDisabled         | `boolean`       | `false`    | The `isDisabled` attribute to indicate if the text area should disabled
               |
| label         | `string`       | `undefined`    | The `label` attribute will be used as placeholder               |
| name         | `string`       | `undefined`    | The `name` attribute is defined for the texarea element               |
| variant         | `string`      | `Outline`    | The `variant` attribute determines the style of the text area.               |
