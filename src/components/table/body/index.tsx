import { MdDelete, MdOutlineEdit, MdVisibility } from "react-icons/md";
import { ButtonsEdit } from "../../buttons/edit";
import { ButtonsDelete } from "../../buttons/delete";
import { ButtonsPrimary } from "../../buttons/primary";
import './body.scss'
import RowItem from "./rowItem";

interface IBody {
    data: any[],
    columns: string[],
    typeButton: "two" | "one"
}

export default function Body({ data, columns, typeButton }: IBody) {
    return (
        <tbody className="body">
            {!!data && data.map((row, rowIndex) => (
                <tr className="body__row" key={rowIndex}>
                    {!!columns && columns.map((column, colIndex) => (
                        <RowItem label={row[column]} key={colIndex} />
                    ))}
                    {typeButton == "two" && (
                        <td key={row} className="body__row__item buttons">
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
                        <td key={row} className="body__row__item buttons">
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
    );
}
