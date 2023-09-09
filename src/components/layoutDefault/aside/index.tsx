import Image from "next/image";
import "./aside.scss";
import logo from "@/src/images/logo-white.png";
import sloga from "@/src/images/logo.png";
import Link from "next/link";
import { MdExpandLess, MdExpandMore, MdOutlineDashboard } from "react-icons/md";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { routes } from "../routes";

interface IAside {
  isOpenMenu: boolean;
}

export function Aside({ isOpenMenu }: IAside) {
  const pathname = usePathname();
  const [isOpenSubItem, setIsOpenSubItem] = useState<boolean>(false);

  return (
    <aside className={isOpenMenu ? "aside" : "aside off"}>
      {isOpenMenu ? (
        <Image
          src={logo}
          width={204}
          height={50}
          alt="Logo Odin Sistema de Gerenciamento Optico"
        />
      ) : (
        <Image
          src={sloga}
          width={50}
          height={50}
          alt="Logo Odin Sistema de Gerenciamento Optico"
        />
      )}
      <div className="aside__links">
        {isOpenMenu && <h5 className="aside__links__title">GESTÃO</h5>}
        <nav className="aside__links__nav">
          <ul className="aside__links__nav__itens">
            {routes.map((item, index) => (
              <li key={index} className={"aside__links__nav__itens__item"}>
                {!!item.subItem ? (
                  <div className="aside__links__nav__itens__item__subNav">
                    <button
                      className="aside__links__nav__itens__item__header"
                      onClick={() => setIsOpenSubItem(!isOpenSubItem)}
                    >
                      <div
                        className={
                          "aside__links__nav__itens__item__header__icon"
                        }
                      >
                        {item.icon}
                      </div>
                      {isOpenMenu && (
                        <div
                          className={
                            "aside__links__nav__itens__item__header__name"
                          }
                        >
                          {item.name}
                          {!isOpenSubItem && <MdExpandMore size={24} />}
                          {isOpenSubItem && <MdExpandLess size={24} />}
                        </div>
                      )}
                    </button>
                    <ul className="aside__links__nav__itens__item__nav">
                      {isOpenSubItem &&
                        item.subItem.map((subItem, index) => (
                          <li
                            key={index}
                            className={
                              pathname == subItem.route
                                ? "aside__links__nav__itens__item__nav__item--active"
                                : "aside__links__nav__itens__item__nav__item"
                            }
                          >
                            <Link href={subItem.route}>{subItem.name}</Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                ) : (
                  <>
                    <div
                      className={
                        pathname === item.route
                          ? "aside__links__nav__itens__item__icon--active"
                          : "aside__links__nav__itens__item__icon"
                      }
                    >
                      {item.icon}
                    </div>
                    {isOpenMenu && (
                      <div
                        className={
                          pathname === item.route
                            ? "aside__links__nav__itens__item__name--active"
                            : "aside__links__nav__itens__item__name"
                        }
                      >
                        <Link href={item.route}>{item.name}</Link>
                      </div>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
