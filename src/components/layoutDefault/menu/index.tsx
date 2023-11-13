import {
  MdExpandLess,
  MdExpandMore,
  MdNotifications,
  MdOutlineMenu,
} from "react-icons/md";
import { ButtonsPrimary } from "../../buttons/primary";
import { AiFillHeart } from "react-icons/ai";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { AuthContext } from "@/src/context/AuthContext";
import Image from "next/image";
import avatar from "@/src/images/avatar.jpeg";
import "./menu.scss";
import slogan from "@/src/images/slogan-indigo.png";
import { routes } from "../routes";
import { Item } from "./item";
import { usePathname } from 'next/navigation'

interface IMenu {
  isOpenMenuPrimary: boolean
  setIsOpenMenuPrimary: Dispatch<SetStateAction<boolean>>
}

export const Menu = ({ isOpenMenuPrimary, setIsOpenMenuPrimary }: IMenu) => {
  const { user } = useContext(AuthContext);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isOpenSubItem, setIsOpenSubItem] = useState<boolean>(false);
  const pathname = `/${usePathname().split("/")[1]}`

  let currentDataRoute = routes.find(item => item.route === pathname);
  let nameCurrentPage = null

  if (!currentDataRoute) {
    currentDataRoute = routes.find(item => {
      if (item.subItem) {
        return item.subItem.find(subItem => subItem.route === pathname)
      }
    })

    nameCurrentPage = currentDataRoute.subItem.find(subItem => subItem.route === pathname)
  }

  const subMenu = [
    // {
    //   name: "Configuração",
    //   route: "/configuracao",
    // },
    {
      name: "Sair",
      route: "/sair",
    },
  ]

  return (
    <header className="menu">
      <div className="hero">
        <Image
          src={slogan}
          width={50}
          height={50}
          alt="Slogan Odin Sitema de Gerenciamento Optico"
          className="hero__slogan"
        />
        <div className="hero__button ">
          <ButtonsPrimary onClick={() => setIsOpenMenuPrimary(!isOpenMenuPrimary)}>
            <MdOutlineMenu size={24} />
          </ButtonsPrimary>
        </div>
        <div className="hero__button subMenu">
          <ButtonsPrimary onClick={() => setIsOpenMenu(!isOpenMenu)}>
            <MdOutlineMenu size={24} />
          </ButtonsPrimary>
        </div>
        <div className="hero__title">
          <div className="hero__title__icon">
            {currentDataRoute.icon}
          </div>
          <h1 className="hero__title__label">
            {nameCurrentPage ? nameCurrentPage.name : currentDataRoute.name}
          </h1>
        </div>
      </div>
      <div className={`content ${isOpenMenu ? 'show' : 'hide'}`}>
        {isOpenMenu && (
          <nav className="nav sidebar">
            <ul className="nav__list">
              {!!routes && routes.map((item, index) => (
                <Item key={index} router={item} setIsOpenSubItem={setIsOpenSubItem} isOpenSubItem={isOpenSubItem} />
              ))}
            </ul>
          </nav>
        )}
        {isOpenMenu && <hr className="line" />}
        <div className={`avatar ${isOpenMenu ? 'open' : ''}`}>
          {/* <MdNotifications size={24} className="avatar__icon" /> */}
          <div className="avatar__user">
            {!!user && (
              <Image
                src={user?.photo || avatar}
                width={50}
                height={50}
                alt={`${user?.name} Avatar Photo`}
                className="photo"
              />
            )}
            <div className="content">
              <h5 className="content__name">{`${user?.name} ${user?.sobrenome}`}</h5>
              <span className="email">
                {user?.email}
              </span>
            </div>
          </div>
          <button className="avatar__button" onClick={() => setIsOpenMenu(!isOpenMenu)}>
            {isOpenMenu && <MdExpandLess size={24} />}
            {!isOpenMenu && <MdExpandMore size={24} />}
          </button>
        </div>
        {isOpenMenu && (
          <nav className="nav">
            <ul className="nav__list">
              {!!subMenu && subMenu.map((item, index) => (
                <Item key={index} router={item} />
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};