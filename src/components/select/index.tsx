"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
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
  onChange = null,
}: ISelect) {
  const [select, setSelect] = useState(value);

  useEffect(() => {
    function closeAllSelect(elmnt: HTMLElement | null) {
      /* Função para fechar todas as caixas de seleção, exceto a atual: */
      const x = document.getElementsByClassName("select-items");
      const y = document.getElementsByClassName("select-selected");
      const xl = x.length;
      const yl = y.length;
      const arrNo: number[] = [];

      for (let i = 0; i < yl; i++) {
        if (elmnt === y[i]) {
          arrNo.push(i);
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }

      for (let i = 0; i < xl; i++) {
        if (!arrNo.includes(i)) {
          x[i].classList.add("select-hide");
        }
      }
    }

    const customSelects = document.getElementsByClassName("selects__select");

    for (let i = 0; i < customSelects.length; i++) {
      const x = customSelects[i]
      const selElmnt = x.querySelector("select")

      // Use uma assertiva de tipo para dizer ao TypeScript que é um HTMLSelectElement
      const selectElement = selElmnt as HTMLSelectElement | null
      // Verifica se selElmnt é do tipo HTMLSelectElement antes de usar getElementsByTagName
      if (selectElement) {
        const ll = selectElement.length;

        /* Para cada elemento, crie um novo DIV que atuará como o item selecionado: */
        const a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x.appendChild(a);

        /* Para cada elemento, crie um novo DIV que conterá a lista de opções: */
        const b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");

        for (let j = 1; j < ll; j++) {
          /* Para cada opção no elemento select original, crie um novo DIV que atuará como um item de opção: */
          const c = document.createElement("DIV");
          c.innerHTML = selElmnt.options[j].innerHTML;
          c.addEventListener("click", function (e) {
            /* Quando um item é clicado, atualize a caixa de seleção original e o item selecionado: */
            const y = this.parentNode?.parentNode?.getElementsByTagName("select")[0];
            const sl = y?.length;
            const h = this.parentNode?.previousSibling;

            if (!y || !sl || !h) return;

            for (let i = 0; i < sl; i++) {
              if (y.options[i].innerHTML === this.innerHTML) {
                y.selectedIndex = i;
                h.innerHTML = this.innerHTML;

                const sameAsSelected = this.parentNode?.getElementsByClassName("same-as-selected");
                const yl = sameAsSelected?.length;

                if (yl) {
                  for (let k = 0; k < yl; k++) {
                    sameAsSelected[k].removeAttribute("class");
                  }
                }

                this.setAttribute("class", "same-as-selected");
                break;
              }
            }

            h.click();
          });

          b.appendChild(c);
        }

        x.appendChild(b);

        a.addEventListener("click", function (e) {
          /* Quando a caixa de seleção é clicada, feche todas as outras caixas de seleção e abra/feche a caixa de seleção atual: */
          e.stopPropagation();
          closeAllSelect(this);
          this.nextSibling?.classList.toggle("select-hide");
          this.classList.toggle("select-arrow-active");
        });
      }
    }

    /* Se o usuário clicar em qualquer lugar fora da caixa de seleção, feche todas as caixas de seleção: */
    document.addEventListener("click", () => closeAllSelect(null));

    // Limpar efeitos colaterais quando o componente é desmontado
    return () => {
      document.removeEventListener("click", () => closeAllSelect(null));
    };
  }, []);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelect(newValue);
    if (onChange) {
      onChange(newValue);
    }
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
          onChange={(event) => handleSelectChange(event)}
        >
          {selection.map((item, index) => (
            <option key={index} value={item.value}>
              {item.item}
            </option>
          ))}
        </select>
      </div>
      {erro ? (
        <span className="selects__message">Mensagem de erro!</span>
      ) : null}
    </div>
  );
}
