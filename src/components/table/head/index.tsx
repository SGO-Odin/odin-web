import './head.scss'

interface IHead {
    columns: string[]
    isButton: boolean
}

export default function Head({ columns, isButton }: IHead) {
    return (
        <thead className="head">
            <tr className="head__col">
                {!!columns && columns.map((column, index) => (
                    <th key={index} className="head__col__item">
                        {column}
                    </th>
                ))}
                {isButton && <th className="head__col__item">...</th>}
            </tr>
        </thead>
    );
}
