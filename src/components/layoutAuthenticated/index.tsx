import Image from "next/image";
import "./layoutAuthenticated.scss";
import slogan from "@/src/images/logo.png";
import logo from "@/src/images/logo-2.svg";

export function LayoutAuthenticated({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container">
      <div className="container__image">
        <Image
          src={slogan}
          width={315}
          height={315}
          alt="Logo Odin Sistema de Gerenciamento Optico"
        />
        <h1 className="container__image__title">ODIN</h1>
        <span className="container__image__paragraph">
          O sistema de gerenciamento de ótica que enxerga tudo!
        </span>
      </div>
      <div className="container__content">
        <Image
          src={logo}
          width={180}
          height={44}
          alt="Logo Odin Sistema de Gerenciamento Optico"
          className="container__content__logo"
        />
        {children}
      </div>
    </section>
  );
}
