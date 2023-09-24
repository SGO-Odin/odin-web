import { useState } from "react";
import { Aside } from "./aside";
import "./layoutDefault.scss";
import { Menu } from "./menu";

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  return (
    <section className="layoutDefault">
      <Aside isOpenMenu={isOpenMenu} />
      <div className="layoutDefault__content">
        <Menu isOpenMenuPrimary={isOpenMenu} setIsOpenMenuPrimary={setIsOpenMenu} />
        <section className="layoutDefault__content__hero">{children}</section>
      </div>
    </section>
  );
}
