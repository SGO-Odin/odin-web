import { MdAttachMoney, MdBuild, MdInventory, MdOutlineAppRegistration, MdOutlineDashboard, MdPerson } from "react-icons/md";
import { BsEyeglasses } from 'react-icons/bs'
import { IRouter } from "@/src/interface/utils";

export const routes: IRouter[] = [
  {
    name: "Dashboard",
    route: "/",
    icon: <MdOutlineDashboard size={24} />,
    subItem: null,
  },
  {
    name: "Ordem de Serviço",
    route: "/ordem-servico",
    icon: <MdBuild size={24}/>,
    subItem: null,
  },
  {
    name: "Vendas",
    route: "/vendas",
    icon: <MdAttachMoney size={24}/>,
    subItem: null,
  },
  {
    name: "Cliente",
    route: "/cliente",
    icon: <MdPerson size={24}/>,
    subItem: null,
  },
  {
    name: "Produtos",
    route: "/produtos",
    icon: <BsEyeglasses size={24}/>,
    subItem: null,
  },
  {
    name: "Estoque",
    route: "/estoque",
    icon: <MdInventory size={24}/>,
    subItem: null,
  },
  {
    name: "Cadastros",
    route: "#",
    icon: <MdOutlineAppRegistration size={24}/>,
    subItem: [
      {
        name: "Grifes",
        route: "/grifes",
      },
      {
        name: "Fornecedor",
        route: "/fornecedor",
      },
    ],
  },
];
