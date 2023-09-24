import { IRouter } from "@/src/interface/utils";
import { useState } from "react";
import { MdExpandMore, MdOutlineDashboard } from "react-icons/md";
import './menu-item.scss'
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IMenu {
    isOpen: boolean
    router: IRouter
}

export const MenuItem = ({ router, isOpen }: IMenu) => {
    const pathname = usePathname();

    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const { name, route, icon, subItem } = router

    const toggleSubMenu = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
    };

    return (
        <li className={`menu-item ${isOpen ? 'open' : 'closed'}`}>
            <div className={`menu-item-label ${isOpen ? 'open' : 'closed'} ${isSubMenuOpen ? 'show' : 'hide'} ${pathname === route ? 'active' : ' '}`} onClick={toggleSubMenu}>
                <span className={`menu-icon ${isOpen ? 'show' : 'hide'} ${isSubMenuOpen ? 'open' : 'close'} ${pathname === route ? 'active' : ' '}`}>{icon}</span>
                <span className={`menu-text ${isOpen ? 'show' : 'hide'}`}>
                    <Link href={route}>{name}</Link>
                    {subItem && subItem.length > 0 && (
                        <MdExpandMore size={24} className={`arrow-icon ${isSubMenuOpen ? 'open' : ''}`} />
                    )}
                </span>
            </div>
            {isSubMenuOpen && subItem && isOpen && (
                <ul className="sub-menu">
                    {subItem.map((subItem, index) => (
                        <li className={`sub-menu-item ${pathname === subItem.route ? 'active' : ' '}`} key={index}>
                            <Link href={subItem.route}>{subItem.name}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};