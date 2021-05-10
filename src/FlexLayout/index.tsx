import React from 'react';
import { ReactNode } from 'react';
import { FlexDirection, JustifyContent, FlexWrap, AlignItems, AlignContent } from "../sharedTypes"

export type FlexLayoutProps = {
    /**
     * The children property is the content inside the flex container
     */
    children: ReactNode;

    /**
     * Prop to pass a class to the underlying div for convenience
     */ 
    className?: string;

    /**
     * The flexDirection property sets how flex items are placed in the
     * flex container defining the main axis and the direction. value 'row'
     * as default
     */
    flexDirection?: FlexDirection;

    /**
     * The justifyContent property defines how the browser distributes space
     * between and around content items along the flex container
     */
    justifyContent?: JustifyContent;

    /**
     * The flexWrap property sets whether flex items are forced onto one line
     * or can warp onto multiple lines.
     */
    flexWrap?: FlexWrap;

    /** 
     * The alignItems property controls the alignment of flex items on
     * the cross axis
     */
    alignItems?: AlignItems;

    /**
     *  aligns a flex container’s lines within when there is extra space in the cross-axis, 
     *  similar to how justify-content aligns individual items within the main-axis
     */
    alignContent?: AlignContent;

    /** 
     * The flexGrow property sets the flex grow factor of a flex item's
     * main size. It is not assigned directly to the style of the container. 
     * Instead it is used to compute the flex property. Ignored if flex prop 
     * is passed
     */
    flexGrow?: number;

    /** 
     * The flexShrink property sets the flex shrink of a flex item
     * It is not assigned directly to the style of the container. 
     * Instead it is used to compute the flex property. Ignored if 
     * flex prop is passed
     */
    flexShrink?: number;

    /** 
     * The flexBasis property sets the initial main size of a flex item. 
     * It is not assigned directly to the style of the container. 
     * Instead it is used to compute the flex property. Ignored if 
     * flex prop is passed
     */
    flexBasis?: number | 'auto';

    /** 
     * The flex property is a shorthand that sets a flex item will grow or 
     * shrink to fit the space availables in its flex container. This component 
     * computes the value for flex based on the flexGrow, flexShrink, flexBasis props.
     */
    flex?: string;

    /**
     * Extra props to be passed to the underlying div. Style is not overriden, it is merged with
     * the computed style from the FlexLayout props. All other props are passed as is.
     */
    containerProps?: React.ComponentPropsWithoutRef<'div'>;
}

const FlexLayout: React.FC<FlexLayoutProps> = ((
    {
        children,
        className,
        flexDirection = 'row',
        justifyContent = 'flex-start',
        flexWrap = 'nowrap',
        alignItems = 'flex-start',
        alignContent = 'normal',
        flexGrow = 0,
        flexShrink = 1,
        flexBasis = 'auto',
        flex: rawFlex,
        containerProps = {}
    }
) => {

    const flex = rawFlex || `${flexGrow} ${flexShrink} ${flexBasis}`
    const { style: outerStyle={}, ...rest }  = containerProps ?? {};

    const style = {
        display: 'flex',
        justifyContent,
        alignItems,
        alignContent,
        flexDirection,
        flexWrap,
        flex,
        ...outerStyle
    }

    return (
        <div className={className} style={style} {...rest}>
            {children}
        </div>
    )
})

export default FlexLayout;


