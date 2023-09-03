import { ChangeEvent } from "react"

export interface IButton {
    autofocus?: boolean
    disabled?: boolean
    form?: string
    formaction?: string
    name?: string
    type?: "button" | "submit" | "reset"
    value?: string
    children?: React.ReactNode | string
    onClick?: () => {}
}

export interface ITextField {
    autocomplete?: string
    autofocus?: boolean
    disabled?: boolean
    form?: string
    formaction?: string
    inputmode?: string
    minlength?: number
    maxlength?: number
    name?: string
    placeholder?: string
    required?: boolean
    value?: string
    label?: string
    id?: string    
    erro?: boolean
    onChange?: () => {}
}

export interface ISelect {
    disabled?: boolean
    form?: string
    multiple?: boolean
    name?: string
    required?: boolean
    value?: string
    label?: string
    id?: string    
    erro?: boolean
    onChange?: (event: string) => void
}