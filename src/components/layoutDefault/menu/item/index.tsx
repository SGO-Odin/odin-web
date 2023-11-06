import { IRouter } from "@/src/interface/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import './item.scss'

interface IItem {
    router?: IRouter
    setIsOpenSubItem?: React.Dispatch<React.SetStateAction<boolean>>
    isOpenSubItem?: boolean
}

export const Item = ({ router, setIsOpenSubItem, isOpenSubItem }: IItem) => {
    const pathname = usePathname();
    const { name, route, subItem } = router

    return (
        <li
            className={`item ${pathname == route ? 'active' : ''}`}
        >
            {!!subItem ? (
                <>
                    <button
                        className="item__header"
                        onClick={() => setIsOpenSubItem(!isOpenSubItem)}
                    >
                        Cadatros
                        {!isOpenSubItem && <MdExpandMore size={24} />}
                        {isOpenSubItem && <MdExpandLess size={24} />}
                    </button>
                    <ul className="list">
                        {isOpenSubItem && !!subItem &&
                            subItem.map((subItem, index) => (
                                <li
                                    key={index}
                                    className={`item ${pathname == subItem.route ? 'active' : ''}`}
                                >
                                    <Link href={subItem.route}>{subItem.name}</Link>
                                </li>
                            ))}
                    </ul>
                </>
            ) : (
                <Link href={route}>{name}</Link>
            )}
        </li>
    );
}