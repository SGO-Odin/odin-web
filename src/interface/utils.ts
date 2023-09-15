import { ChangeEventHandler, MouseEventHandler, ReactNode } from "react";

export interface IButton {
  autofocus?: boolean;
  disabled?: boolean;
  form?: string;
  formaction?: string;
  name?: string;
  type?: "button" | "submit" | "reset";
  value?: string;
  children?: React.ReactNode | string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface ITextField {
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
  messageErro?: string
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

export interface ISelect {
  disabled?: boolean;
  form?: string;
  multiple?: boolean;
  name?: string;
  required?: boolean;
  value?: string;
  label?: string;
  id?: string;
  erro?: boolean;
  onChange?: (event: string) => void;
}

export interface ISignInData {
  login: string;
  password: string;
}

export interface IUser {
  name: string;
  sobrenome: string;
  email: string;
  photo: string;
}

export interface ITable {
  data: Array<any>
  columns: Array<string>
  isButton: boolean
  typeButton?: "two" | "one"
  to?: Array<string>
}