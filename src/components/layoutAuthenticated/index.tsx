import Image from "next/image";
import "./layoutAuthenticated.scss";
import Logo from "../../images/logo.png";

export function LayoutAuthenticated({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container">
      <div className="container__image">
        <Image src={Logo} width={315} height={315} alt="Logo Odin Sistema de Gerenciamento Optico" />
        <h1 className="container__image__title">ODIN</h1>
        <span className="container__image__paragraph">
          O sistema de gerenciamento de ótica que enxerga tudo!
        </span>
      </div>
      <div className="container__content">{children}</div>
    </section>
  );
}
