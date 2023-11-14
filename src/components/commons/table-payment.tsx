import { MdCreditCard, MdDelete, MdPayments, MdPix } from "react-icons/md";
import './table-payment.scss'
import { handleFormatNumber } from "@/src/hook/format-number";
import { IPayment } from "@/src/interface/datas";

interface ITablePayment {
    rows: IPayment[]
    onClick?: (_id: number) => void
}

export default function TablePayment({ rows, onClick }: ITablePayment) {
    const handleIconType = (type: string): JSX.Element => {
        switch (true) {
            case type === 'CREDIT_CARD' || type === 'DEBIT_CARD':
                return <MdCreditCard size={24} />
            case type === 'MONEY':
                return <MdPayments size={24} />
            default:
                return <MdPix size={24} />
        }
    }

    const handleNameType = (type: string): string => {
        switch (true) {
            case type === 'DEBIT_CARD':
                return 'Cartão de Débito'
            case type === 'CREDIT_CARD':
                return 'Cartão de Crédito'
            case type === 'MONEY':
                return 'Dinheiro'
            default:
                return 'Pix'
        }
    }

    return (
        <div className="table-payment">
            <table className="table-payment__table">
                <tbody className="table-payment__table__body">
                    {!!rows && rows.map((row, index) => (
                        <tr key={index} className="table-payment__table__body__row">
                            <td className="table-payment__table__body__row__item">
                                {handleIconType(row.type)}
                            </td>
                            <td className="table-payment__table__body__row__item">{handleNameType(row.type)}</td>
                            <td className="table-payment__table__body__row__item">{`- R$ ${handleFormatNumber(row.amount)}`}</td>
                            <td className="table-payment__table__body__row__item">{`Data de lançamento ${row.date}`}</td>
                            {!!onClick && (<td className="table-payment__table__body__row__item">
                                <button onClick={() => onClick(row._id)} type="button">
                                    <MdDelete size={24} />
                                </button>
                            </td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
