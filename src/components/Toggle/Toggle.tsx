import React from "react";
import {FormAPI} from "../Form/Form";
import getClassName from "getclassname";

interface TogglePropsWithoutRef {
    id?: string;

    label?: string;

    children?: React.ReactNode;

    disabled: boolean;

    checked: boolean;

    initialValue: boolean;

    onChange?: React.ChangeEventHandler<HTMLInputElement>;

    inputProps?: React.ComponentPropsWithoutRef<"input">;

    labelProps?: React.ComponentPropsWithoutRef<"label">;

    containerProps?: React.ComponentPropsWithoutRef<"div">;

    formAPI?: FormAPI<any>;
}

export type ToggleProps = TogglePropsWithoutRef & {
    ref?: React.ForwardedRef<HTMLInputElement>;
}

export type ToggleInnerElement = HTMLInputElement

const Toggle = React.forwardRef<ToggleInnerElement, TogglePropsWithoutRef>(({
    label,
    labelProps,
    inputProps,
    containerProps,
    onChange,
    disabled=false,
    id = "",
    formAPI,
    checked,
    initialValue=false,
}): JSX.Element => {
    const controlled = checked !== undefined;
    const [innerChecked, setInnerChecked] = React.useState(initialValue)

    const handleChange = (e) => {

        formAPI?.handleChange?.(e);
        onChange?.(e);
        setInnerChecked(!innerChecked);
    }

    const toggleClass = getClassName({ base: "eds-toggle" })
    const containerClass = toggleClass.extend("&__container");
    const labelClass = containerClass.extend('&__label').recompute({ "&--disabled": disabled })

    if (label) {
        const labelComponentId = id? id:label.replace(" ","_");

        return (
            <div {...containerProps} className={containerClass}>
                <input
                    id={labelComponentId}
                    type="checkbox"
                    className={toggleClass}
                    onChange={handleChange}
                    checked={controlled !== undefined? checked: innerChecked}
                    disabled={disabled}
                    {...inputProps}
                />
                <label {...labelProps} htmlFor={labelComponentId} className={labelClass} >{label}</label>
            </div>
        )
    }

    return <input
        type="checkbox"
        className="eds-toggle"
        id={id}
        disabled={disabled}
        checked={controlled !== undefined? checked: innerChecked}
        onChange={handleChange}
        {...inputProps}
    />
})

export default Toggle;