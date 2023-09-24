import Image from "next/image";
import "./aside.scss";
import logo from "@/src/images/logo-white.png";
import sloga from "@/src/images/logo.png";
import { MdExpandLess, MdExpandMore, MdOutlineDashboard } from "react-icons/md";
import { routes } from "../routes";
import { MenuItem } from "./menuItem";

interface IAside {
  isOpenMenu: boolean;
}

export function Aside({ isOpenMenu }: IAside) {

  return (
    <div className={`sidebar ${isOpenMenu ? '' : 'closed'}`}>
      {isOpenMenu ? (
        <Image
          src={logo}
          width={204}
          height={50}
          alt="Logo Odin Sistema de Gerenciamento Optico"
          className="logo"
        />
      ) : (
        <Image
          src={sloga}
          width={50}
          height={50}
          alt="Logo Odin Sistema de Gerenciamento Optico"
          className="logo"
        />
      )}
      <ul className="sidebar__menu">
        {routes.map((route, index) => (
          <MenuItem key={index} router={route} isOpen={isOpenMenu} />
        ))}
      </ul>
    </div>
  );
}
