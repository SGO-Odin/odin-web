import LayoutDefault from "@/src/components/layoutDefault";
import "./dashboard.scss";
import { Hero } from "@/src/components/hero";
import Image from "next/image";
import slogan from "@/src/images/slogan-indigo.png";
import { MdAttachMoney, MdBuild, MdPerson } from "react-icons/md";
import { BsEyeglasses } from "react-icons/bs";
import Link from "next/link";


export function DashboardTemplate() {
  return (
    <LayoutDefault>
      <section className="dashboard">
        <Hero isButtonPrymary={false} title="Dashboard" paragraph={`Principais Funcionalidades da ODIN!.`}>
          <section className="dashboard__cards">
            <Link href={'/cliente/cadastrar'} className="dashboard__card">
              <MdPerson size={48} className="dashboard__icon" />
              <h2 className="dashboard__title">Cadastrar Clientes</h2>
              <p className="dashboard__sub-title">
                Adicione clientes com facilidade. Simplifique o cadastro para aprimorar o atendimento e a fidelização.
              </p>
            </Link>
            <Link href={'/ordem-servico/cadastrar'} className="dashboard__card">
              <MdBuild size={48} className="dashboard__icon" />
              <h2 className="dashboard__title">Criar uma O.S.</h2>
              <p className="dashboard__sub-title">
                Adicione ordens de serviço aqui. Simplifique o processo para um acompanhamento eficaz e atendimento personalizado.
              </p>
            </Link>
            <Link href={'/vendas/cadastrar'} className="dashboard__card">
              <MdAttachMoney size={48} className="dashboard__icon" />
              <h2 className="dashboard__title">Registar uma Venda</h2>
              <p className="dashboard__sub-title">
                Registre vendas facilmente aqui. Simplifique o processo para uma gestão eficaz e atendimento de qualidade.
              </p>
            </Link>
            <Link href={'/produtos/cadastrar'} className="dashboard__card">
              <BsEyeglasses size={48} className="dashboard__icon" />
              <h2 className="dashboard__title">Cadastrar um Produto</h2>
              <p className="dashboard__sub-title">
                Adicione produtos rapidamente aqui. Simplifique o cadastro para uma gestão de estoque eficaz.
              </p>
            </Link>
          </section>
        </Hero>

        <footer className="dashboard__footer">
          <Image
            src={slogan}
            width={60}
            height={60}
            alt="Slogan Odin Sitema de Gerenciamento Optico"
            className="hero__slogan"
          />
          <p className="dashboard__paragraph">Copyright 2023 © <strong>ODIN</strong>. Todos os direitos reservados.</p>
        </footer>
      </section>
    </LayoutDefault>
  );
}