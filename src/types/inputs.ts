import {ChangeEventHandler} from "react";

export interface StyledInputArgs {
    value?: string | number | readonly string[]
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined,
    type: string,
    name?: string,
    label?: string|number
}