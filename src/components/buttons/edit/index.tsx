import Link from 'next/link'
import './buttonsEdit.scss'
import { ILink } from '@/src/interface/utils'

export function ButtonsEdit({ children, href = '' }: ILink) {
    return (
        <Link
            className="button-edit"
            href={href}>
            {children}
        </Link>
    )
}