import React from "react";
import "./select.scss";
import { ISelect } from "@/src/interface/utils";

export function Select({
  disabled = false,
  minlength = 0,
  maxlength = 150,
  name,
  placeholder,
  required = false,
  value,
  label,
  id,
  onChange,
  messageErro = "",
  options = []
}: ISelect) {

  return (
    <div className="selects">
      <label className="selects__label" htmlFor={id}>
        {label}
      </label>
      <input
        type="select"
        list={`${id}s`}
        id={id}
        disabled={disabled}
        minLength={minlength}
        maxLength={maxlength}
        name={name}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        className="selects__select" />
      <datalist id={`${id}s`}>
        {options.map((option, index) => (
          <option key={index} value={option}></option>
        ))}
      </datalist>
      {messageErro ? (
        <span className="selects__message">{messageErro}</span>
      ) : null}
    </div>
  )
}
