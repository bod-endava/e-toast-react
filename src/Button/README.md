# Button

<hr>

A component for user interaction. Just a button.

#### Import

```js
import { Button } from '@e-toast/react';
//or
import Button from '@e-toast/react/lib/Button';
```

#### Usage

```jsx
<Button onClick={() => console.log("Blahh!")}>Click me!</Button>
// or
<Button onClick={() => console.log("Blahh!")} label="Click me!" />
```

#### Local Type Definitions

| Name |  Definition | Description |
| ---------- | ------ | --------------------------- |
| ButtonVariants |  ` "primary" \| "outline" \| "cta" \| "text" \| "icon"` | Style variant of a button |

#### Required props

| Name       | Type   | Description                 |
| ---------- | ------ | --------------------------- |
| `label`    | `string` | Used as the text on the button. Required if children is not passed. Has precedence over children. |
| `children` | `node`   | Used as the text on the button. Required if label is not passed. Label has precedence over this |

#### Optional props

| Name         | Type       | Default    | Description               |
| ------------ | ---------- | ---------- | ------------------------- |
| `onClick`    | `function` | `() => {}` | Callback to run on clicking the button |
| `disabled`   | `boolean`  | `false`    | whether the button is disabled or not |
| `variant`    | ButtonVariants (`"primary" \| "outline" \| "cta" \| "text" \| "icon"`) | `"primary"`   | Style variant to use. More info on types |
| `icon`    | Icons | `undefined` | Icon to use. For more info head to shared types. Too many icons to put on this page |
| `size`    | Sizes (`"small"`) | `undefined` | Size of the button. Currently only one available: "small" |
| `ref`    | `React.ForwardedRef<HTMLButtonElement>` | `undefined` | ref to be forwarded to the underlying `button` element |
| `buttonProps`    | `React.ComponentPropsWithoutRef<"button">` | `{ }` | props to be passed to the underlying `button` element |

