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
}: ITextField) {
  return (
    <div className="textfield">
      {erro ? (
        <span className="textfield__message">Mensagem de erro!</span>
      ) : null}
      <input
        className={"textfield__input" + (erro ? "--erro" : '')}
        type="text"
        id={id}
        disabled={disabled}
        minLength={minlength}
        maxLength={maxlength}
        name={name}
        value={value}
        required={required}
        placeholder={placeholder}
      />
      <label className="textfield__label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}