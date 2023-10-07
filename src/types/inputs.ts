import {ChangeEventHandler, ReactEventHandler} from "react";
import exp from "constants";

export interface StyledInputArgs {
    value?: string | number | readonly string[]
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined,
    type?: string,
    name?: string,
    label?: string|number
}

export interface StyledSelectOption {
    name: string,
    value: string
}
export interface StyledSelectArgs {
    value?: string | number | readonly string[]
    onSelect?: ReactEventHandler<HTMLSelectElement> | undefined,
    type?: string,
    name?: string,
    label?: string|number,
    options: StyledSelectOption[]
}
