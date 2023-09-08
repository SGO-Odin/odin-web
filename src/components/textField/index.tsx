import { ITextField } from "@/src/interface/utils";
import "./textField.scss";

export function TextField({
  disabled = false,
  minlength = 0,
  maxlength = 150,
  name,
  placeholder,
  required = false,
  value,
  label,
  id,
  erro = false,
  type = "text",
  onChange,
  messageErro = ""
}: ITextField) {
  return (
    <div className="textfield">
      {erro ? (
        <span className="textfield__message">{messageErro}</span>
      ) : null}
      <input
        className={"textfield__input" + (erro ? "--erro" : '')}
        type={type}
        id={id}
        disabled={disabled}
        minLength={minlength}
        maxLength={maxlength}
        name={name}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
      />
      <label className="textfield__label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
