import { MdDelete, MdOutlineEdit, MdVisibility } from "react-icons/md";
import { ButtonsEdit } from "../buttons/edit";
import "./tablesCustom.scss";
import { ITable } from "@/src/interface/utils";
import { ButtonsDelete } from "../buttons/delete";
import { ButtonsPrimary } from "../buttons/primary";

export function TablesCustom({ data, columns, isButton, typeButton }: ITable) {
  return (
    <div className="table__container">
      <table className="table">
        <thead className="table__head">
          <tr className="table__head__col">
            {columns?.map((column, index) => (
              <th key={index} className="table__head__col__item">
                {column}
              </th>
            ))}
            {isButton && <th className="table__head__col__item">...</th>}
          </tr>
        </thead>

        <tbody className="table__body">
          {data?.map((row, rowIndex) => (
            <tr className="table__body__row" key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td className="table__body__row__item" key={colIndex}>
                  {row[column]}
                </td>
              ))}
              {typeButton == "two" && (
                <td key={row} className="table__body__row__item buttons">
                  <div>
                    <ButtonsEdit>
                      <MdOutlineEdit size={24} />
                    </ButtonsEdit>
                  </div>
                  <div>
                    <ButtonsDelete>
                      <MdDelete size={24} />
                    </ButtonsDelete>
                  </div>
                </td>
              )}
              {typeButton == "one" && (
                <td key={row} className="table__body__row__item buttons">
                  <div>
                    <ButtonsPrimary>
                      <MdVisibility size={24} />
                    </ButtonsPrimary>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
