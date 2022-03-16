import React from 'react';
import { Story, Meta } from '@storybook/react';
import Toggle, {ToggleProps}  from '.';
import {
    noControl,
    textControl,
    objectControl,
    booleanControl
} from '../../stories/utils'

export default {
    title: '@e-toast/Toggle',
    component: Toggle,
    argTypes: {
        id: textControl(),
        label: textControl(),
        disabled: booleanControl(),
        initialValue: booleanControl(),
        checked: booleanControl(),
        inputProps: objectControl(),
        labelProps: objectControl(),
        containerProps: objectControl(),
        ref: noControl(),
        children: noControl(),
        onChange: noControl(),
    }
} as Meta;

const Template: Story<ToggleProps> = (args) => <Toggle {...args} />

export const Controlled = Template.bind({});
Controlled.args = {
    label: "Toggle",
    checked: true,
    initialValue: false
}

export const Uncontrolled = Template.bind({});
Uncontrolled.args = {
    label: "Toggle",
}