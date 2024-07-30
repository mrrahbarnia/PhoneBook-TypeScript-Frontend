"use client"

import React, { Fragment, useState } from "react";
import { InputProps } from "@/types/components/InputType";


export function Input(props: InputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setInputValue(event.target.value)
    }

    const showPasswordHandler = () => {
        setShowPassword(!showPassword);
    }

    const showPasswordClassNames = !showPassword ? "dark:text-black text-white cursor-pointer" : "dark:text-black text-white cursor-pointer line-through"

    return <Fragment>
        {props.label && <label className={props.labelClassName}>{props.label}</label>}
        <input
            className={props.inputClassName}
            type={props.type === "password" && showPassword ? "text" : props.type}
            value={inputValue}
            name={props.name}
            placeholder={props.placeHolder}
            onChange={onChangeHandler}

        />
        {props.type === "password" && <p onClick={showPasswordHandler} className={showPasswordClassNames}>{showPassword ? "Hidden" : "Show"}</p>}
    </Fragment>
}
