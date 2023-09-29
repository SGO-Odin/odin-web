import React, { useState } from "react";
import "./select.scss";
import { ISelect } from "@/src/interface/utils";

const selection = [
  {
    item: "Opção 1",
    value: "opcao1",
  },
  {
    item: "Opção 2",
    value: "opcao2",
  },
  {
    item: "Opção 3",
    value: "opcao3",
  },
];

export function Select({
  disabled = false,
  multiple = false,
  name,
  required = false,
  value,
  label,
  id,
  erro = false,
  onChange,
}: ISelect) {
  const [select, setSelect] = useState<string>(value ?? "");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleButton = () => {
    setIsOpen(!isOpen);
  };

  const handleSelected = (item: string) => {
    onChange(item)
    setSelect(item);
    setIsOpen(!isOpen);
  };

  return (
    <div className="selects">
      <label className="selects__label" htmlFor={id}>
        {label}
      </label>
      <div
        className={
          disabled
            ? "selects__select--disabled"
            : erro
              ? "selects__select--erro"
              : "selects__select"
        }
      >
        <select
          name={name}
          id={id}
          required={required}
          multiple={multiple}
          value={select}
          className="select-selected"
          onClick={handleButton}
        >
          <option className="select-selected__item">Selecione uma opção</option>
          {selection.map((item, index) => (
            <option key={index} className="select-selected__item" value={item.value}>
              {item.item}
            </option>
          ))}
        </select>
        {isOpen && (
          <div className="select-items">
            <ul className="select-items__list">
              {selection.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSelected(item.value)}
                  className="select-items__list__item"
                >
                  {item.item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {erro ? (
        <span className="selects__message">Mensagem de erro!</span>
      ) : null}
    </div>
  );
}
