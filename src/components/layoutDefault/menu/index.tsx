import {
  MdExpandLess,
  MdExpandMore,
  MdNotifications,
  MdNotificationsActive,
  MdOutlineClose,
  MdOutlineMenu,
} from "react-icons/md";
import { ButtonsPrimary } from "../../buttons/primary";
import { AiFillHeart } from "react-icons/ai";
import { useContext, useState } from "react";
import { AuthContext } from "@/src/context/AuthContext";
import Image from "next/image";
import avatar from "@/src/images/avatar.jpeg";
import "./menu.scss";
import slogan from "@/src/images/slogan-indigo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "../routes";

export function Menu() {
  const { user } = useContext(AuthContext);
  const pathname = usePathname();
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isOpenSubItem, setIsOpenSubItem] = useState<boolean>(false);
  const [isOpenMenuDesk, setIsOpenMenuDesk] = useState<boolean>(false)

  const handleOpenClose = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <header className="menu">
      <div className="menu__desktop">
        <div className="menu__desktop__hero">
          <div className="menu__desktop__hero__button">
            <ButtonsPrimary>
              <MdOutlineMenu size={24} />
            </ButtonsPrimary>
          </div>
          <div className="menu__desktop__hero__title">
            <div className="menu__desktop__hero__title__icon">
              <AiFillHeart size={24} />
            </div>
            <h1 className="menu__desktop__hero__title__label">Grifes</h1>
          </div>
        </div>
        <div className="menu__desktop__avatar">
          <MdNotifications size={24} className="menu__desktop__avatar__icon" />
          {!!user && (
            <Image
              src={user?.photo || avatar}
              width={50}
              height={50}
              alt={`${user?.name} Avatar Photo`}
              className="menu__desktop__avatar__photo"
            />
          )}
          <button className="menu__desktop__avatar__button" onClick={() => setIsOpenMenuDesk(!isOpenMenuDesk)}>
            {isOpenMenuDesk && <MdExpandLess size={24}/>}
            {!isOpenMenuDesk && <MdExpandMore size={24} />}
          </button>
          {isOpenMenuDesk && (
            <nav className="menu__desktop__avatar__nav">
            <ul className="menu__desktop__avatar__nav__list">
                <Link className="menu__desktop__avatar__nav__list__item" href={"/configuracao"}>
                    Configuração
                </Link>
                <hr className="menu__mobile__line"/>
                <Link className="menu__desktop__avatar__nav__list__item" href={"/sair"}>
                    Sair
                </Link>
            </ul>
          </nav>
          )}
        </div>
      </div>
      <div className="menu__mobile">
        <div className="menu__mobile__hero">
          <Image
            src={slogan}
            width={50}
            height={50}
            alt="Slogan Odin Sitema de Gerenciamento Optico"
          />
          <div className="menu__mobile__hero__button">
            <ButtonsPrimary onClick={() => handleOpenClose()}>
              {isOpenMenu && <MdOutlineClose size={24} />}
              {!isOpenMenu && <MdOutlineMenu size={24} />}
            </ButtonsPrimary>
          </div>
        </div>
        {isOpenMenu && (
          <nav className="menu__mobile__nav">
            <ul className="menu__mobile__nav__list">
              {routes.map((item, index) => (
                <li
                  key={index}
                  className={
                    pathname == item.route
                      ? "menu__mobile__nav__subList__item--active"
                      : "menu__mobile__nav__subList__item"
                  }
                >
                  {!!item.subItem ? (
                    <>
                      <button
                        className="menu__mobile__nav__list__item__header"
                        onClick={() => setIsOpenSubItem(!isOpenSubItem)}
                      >
                        Cadatros
                        {!isOpenSubItem && <MdExpandMore size={24} />}
                        {isOpenSubItem && <MdExpandLess size={24} />}
                      </button>
                      <ul className="menu__mobile__nav__subList">
                        {isOpenSubItem &&
                          item.subItem.map((subItem, index) => (
                            <li
                              key={index}
                              className={
                                pathname == subItem.route
                                  ? "menu__mobile__nav__subList__item--active"
                                  : "menu__mobile__nav__subList__item"
                              }
                            >
                              <Link href={subItem.route}>{subItem.name}</Link>
                            </li>
                          ))}
                      </ul>
                    </>
                  ) : (
                    <Link href={item.route}>{item.name}</Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
        {isOpenMenu && <hr className="menu__mobile__line" />}
        {isOpenMenu && (
          <div className="menu__mobile__avatar">
            <MdNotifications size={24} className="menu__avatar__icon" />
            <div className="menu__mobile__avatar__user">
              {!!user && (
                <Image
                  src={user?.photo || avatar}
                  width={50}
                  height={50}
                  alt={`${user?.name} Avatar Photo`}
                  className="menu__mobile__avatar__user__photo"
                />
              )}
              <div className="menu__mobile__avatar__user__content">
                <h5 className="menu__mobile__avatar__user__content__name">{`${user?.name} ${user?.sobrenome}`}</h5>
                <span className="menu__mobile__avatar__user__email">
                  {user?.email}
                </span>
              </div>
            </div>
          </div>
        )}
        {isOpenMenu && (
          <nav className="menu__mobile__nav">
            <ul className="menu__mobile__nav__list">
              <li
                className={
                  pathname == "/configuracao"
                    ? "menu__mobile__nav__subList__item--active"
                    : "menu__mobile__nav__subList__item"
                }
              >
                <Link href={"/configuracao"}>Configuração</Link>
              </li>
              <li
                className={
                  pathname == "/sair"
                    ? "menu__mobile__nav__subList__item--active"
                    : "menu__mobile__nav__subList__item"
                }
              >
                <Link href={"/sair"}>Sair</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}