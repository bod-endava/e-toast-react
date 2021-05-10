# FlexLayout

<hr>

This is where the description will go

#### Import

```js
import { FlexLayout } from '@e-toast/react';
//or
import FlexLayout from '@e-toast/react/lib/FlexLayout';
```

#### Usage

```jsx
<FlexLayout justifyContent="center" alignItems="center">
  <div>1</div>
  <div>2</div>
</FlexLayout>
```

#### Required props

| Name       | Type   | Description                 |
| ---------- | ------ | --------------------------- |
| children   |  ReactNode | The children property sets the container for the flex item                            |

#### Optional props

| Name         | Type       | Default    | Description               |
| ------------ | ---------- | ---------- | ------------------------- |
| className | string | `undefined` | Prop to pass a class to the underlying div for convenience |
| flexDirection | FlexDirection | `"row"` |  The flexDirection property sets how flex items are placed in the flex container defining the main axis and the direction.
| justifyContent | JustifyContent | `"flex-start"` | The justifyContent property defines how the browser distributes space between and around content items along the flex container |
| flexWrap | FlexWrap | `"no-wrap"` | The flexWrap property sets whether flex items are forced onto one line or can warp onto multiple lines. | 
| alignItems | AlignItems | `"flex-start"` | The alignItems property controls the alignment of flex items on the cross axis |
| alignContent | AlignContent | `"normal"` | aligns a flex container’s lines within when there is extra space in the cross-axis, similar to how justify-content aligns individual items within the main-axis |
| flexGrow | number | 0 | The flexGrow property sets the flex grow factor of a flex item's main size. It is not assigned directly to the style of the container. Instead it is used to compute the flex property. Ignored if flex prop is passed | 
| flexShrink | number | 1 | The flexShrink property sets the flex shrink of a flex item It is not assigned directly to the style of the container. Instead it is used to compute the flex property. Ignored if flex prop is passed |
| flexBasis | number \| 'auto' | `"auto"` | The flexBasis property sets the initial main size of a flex item. It is not assigned directly to the style of the container. Instead it is used to compute the flex property. Ignored if flex prop is passed | 
| flex | string | `undefined` | The flex property is a shorthand that sets a flex item will grow or shrink to fit the space availables in its flex container. This component computes the value for flex based on the flexGrow, flexShrink, flexBasis props. |
| containerProps | Object | `{}` | Extra props to be passed to the underlying div. Style is not overriden, it is merged with the computed style from the FlexLayout props. All other props are passed as is. |
