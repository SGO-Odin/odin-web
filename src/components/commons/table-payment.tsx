import { MdDelete, MdPayments } from "react-icons/md";
import './table-payment.scss'

interface ITbalePayment {
    rows: string[]
}

export default function TablePayment({ rows }: ITbalePayment) {
    return (
        <div className="table-payment">
            <table className="table-payment__table">
                <tbody className="table-payment__table__body">
                    <tr className="table-payment__table__body__row">
                        <td className="table-payment__table__body__row__item">
                            <MdPayments size={24} />
                        </td>
                        {rows.map((row, index) => (
                            <td key={index} className="table-payment__table__body__row__item">
                                {row}
                            </td>
                        ))}
                        <td className="table-payment__table__body__row__item">
                            <button>
                                <MdDelete size={24} />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
