import { ITextField } from "@/src/interface/utils";
import { AiOutlineSearch } from "react-icons/ai";
import "./search.scss";

export function Search({
  disabled = false,
  minlength = 0,
  maxlength = 150,
  name,
  placeholder = "Buscar",
  required = false,
  value,
  id,
  onChange = null,
  label,
  isLabel = false
}: ITextField) {
  return (
    <div className="search-container">
      {isLabel && (
        <label className="search__label" htmlFor={id}>
          {label}
        </label>
      )}
      <label className={disabled ? "search-disabled" : "search"} htmlFor={id}>
        <input
          className={"search__input"}
          type="search"
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
        <AiOutlineSearch size={24} className="search__label" />
      </label>
    </div>
  );
}
