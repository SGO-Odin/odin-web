import Link from 'next/link'
import './buttonsDelete.scss'
import { ILink } from '@/src/interface/utils'

export function ButtonsDelete({ children, href = '' }: ILink) {
    return (
        <Link
            className="button-delete"
            href={href}>
            {children}
        </Link>
    )
}