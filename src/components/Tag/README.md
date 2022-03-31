# Tag

<hr>

A tag component to categorize elements

#### Import

```js
import { Tag } from '@e-toast/react';
//or
import Tag from '@e-toast/react/lib/Tag';
```

#### Usage

```jsx
// Show me how to use it!
<Tag
  label="Tag"
/>
```
#### Optional props

| Name           | Type                                                                           | Default    | Description                                                                         |
| -------------- | ------------------------------------------------------------------------------ | ---------- | ----------------------------------------------------------------------------------- |
| hasCloseAction | `boolean`                                                                      | `false`    | Property to define if the  the tag has a close action associated                    |
| isDisabled     | `boolean`                                                                      | `false`    | Property to define if the  the tag is disabled                                      |
| label          | `string`                                                                       | `""`       | Text to be displayed by the avatar. Formatted using the supplied formatter function |
| onClick        | `( e: React.MouseEvent, props: TagProps ) => void` | `() => {}` | Click event handler. Will receive the event and the tag props                       |
| tagProps       | `React.ComponentPropsWithoutRef<"div">`                                        | `{ }`      | Props to be passed to the underlying div                                            |