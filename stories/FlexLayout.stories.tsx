import React from 'react';
import { Story, Meta } from '@storybook/react';
import FlexLayout, { FlexLayoutProps } from '../src/FlexLayout';
import {  AlignContent, AlignItems, FlexDirection, FlexWrap, JustifyContent } from './shared/FlexLayoutOptions'

import {
  noControl,
  textControl,
  radioWithOptional,
  selectWithOptional,
  numberControl,
  range,
  objectControl,
  extendControl,
  description
} from './shared/utils'

const blockStyle: React.CSSProperties = {
  padding: '5px',
  margin: '10px',
  color: 'white',
  backgroundColor: 'tomato',
  textAlign: 'center',
  fontFamily: 'Roboto',
  fontSize: '24px',
  fontWeight: 'bold',
  height: '60px',
  width: '60px',
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

export default {
    title: '@e-toast/FlexLayout',
    component: FlexLayout,
    argTypes: {
        children: extendControl(
          numberControl(),
          description(
            `The children property is the content inside the flex container\n`+
            `**For demo purposes this prop is treated as a number**`
          )
        ),
        flexDirection: radioWithOptional(FlexDirection),
        justifyContent: selectWithOptional(JustifyContent),
        alignContent: selectWithOptional(AlignContent),
        alignItems: selectWithOptional(AlignItems),
        flexWrap: radioWithOptional(FlexWrap),
        flexGrow: textControl(),
        flexShrink: textControl(),
        flexBasis: textControl(),
        flex: noControl(),
        containerProps: objectControl(),
    }
} as Meta

const Block = ({ children:n }) => <div style={blockStyle}>{n}</div>

const Template: Story<FlexLayoutProps> = ({children,...args}) => {
  return <FlexLayout {...args}>
    {range(1,(children as any)+1).map((n) => <Block>{n}</Block>)}
  </FlexLayout>
}

export const DefaultLayout = Template.bind({});
DefaultLayout.args = {
  children: 5,
}

export const Multiline = Template.bind({});
Multiline.storyName = "Fixed Size Container"
Multiline.args = {
  children: 15,
  flexWrap: "wrap",
  containerProps: {
    style: {
      width: "360px",
      height: "360px",
      border: "1px solid tomato",
      borderRadius: "4px"
    }
  }
}