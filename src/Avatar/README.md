# Avatar

<hr>

A minituare to be displayed in representation of a user or similar. 

#### Import

```js
import { Avatar } from '@e-toast/react';
//or
import Avatar from '@e-toast/react/lib/Avatar';
```

#### Usage

```jsx
<Avatar 
  label="Juan"
  fill="red"
  onClick={(event, props) => console.log(props.label)}
/>
```

#### Optional props

| Name         | Type       | Default    | Description               |
| ------------ | ---------- | ---------- | ------------------------- |
| label     | `string` | `""` | Text to be displayed by the avatar. Formatted using the supplied formatter function |
| fill      | `string` | `undefined` | Background color of the avatar. The default value depends on the `@e-toast/css` implementation used |
| formatter | `(str: string) => string` | `(str: string) => str.slice(0,2)` | Formatter function to be used to format `label`. The default formatter is a function that takes the first two characters of `label` |
| onClick   | `( e: React.MouseEvent<HTMLDivElement, MouseEvent>, props: AvatarProps ) => void` | `() => {}` | Click event handler. Will receive the event and the avatar props |
| divProps  | `React.ComponentPropsWithoutRef<"div">` | `{ }` | Props to be passed to the underlying div |