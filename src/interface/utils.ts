import { ChangeEventHandler, MouseEventHandler, ReactElement, ReactNode } from "react"
import { IconType } from "react-icons"

export interface IButton {
  autofocus?: boolean
  disabled?: boolean
  form?: string
  formaction?: string
  name?: string
  type?: "button" | "submit" | "reset"
  value?: string
  children?: React.ReactNode | string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export interface ILink {
  name?: string
  children?: React.ReactNode | string
  href?: string
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
  type?: string
  messageErro?: string
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined
  isLabel?: boolean
}

export interface IToggle {
  disabled?: boolean
  name?: string
  required?: boolean
  isActive?: boolean
  label?: string
  id?: string
  erro?: boolean
  messageErro?: string
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined
}

export interface ISelect {
  autocomplete?: string;
  autofocus?: boolean;
  disabled?: boolean;
  form?: string;
  formaction?: string;
  inputmode?: string;
  minlength?: number;
  maxlength?: number;
  name?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  label?: string;
  id?: string;
  erro?: boolean;
  type?: string;
  messageErro?: string;
  options?: string[]
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

export interface ISignInData {
  login: string
  password: string
}

export interface IUser {
  name: string
  sobrenome: string
  email: string
  photo: string
}

export interface ITable {
  data: Array<any>
  columns: Array<string>
  isButton: boolean
  typeButton?: "two" | "one"
  to?: Array<string>
}

export interface IRouter {
  name?: string
  route?: string
  icon?: ReactElement<IconType>
  subItem?:
  | {
    name?: string
    route?: string
  }[]
  | null
}