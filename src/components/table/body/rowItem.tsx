import './rowItem.scss'

interface IRowItem {
    label: string
    isActive?: boolean | null
}

export default function RowItem({ label, isActive = null }: IRowItem) {
    return (
        <td className={`row ${(isActive && isActive !== null) ? 'active' : isActive !== null ? 'inactive' : ''}`}>
            {label}
        </td>
    );
}
