interface IRouter {
    name: string
    route: string
    subItem: {
      name: string
      route: string
    }[] | null;
  };
  
  export const routes: IRouter[] = [
    {
      name: "Dashboard",
      route: "/dashboard",
      subItem: null,
    },
    {
      name: "Ordem de Serviço",
      route: "/ordem-servico",
      subItem: null,
    },
    {
      name: "Vendas",
      route: "/vendas",
      subItem: null,
    },
    {
      name: "Cliente",
      route: "/cliente",
      subItem: null,
    },
    {
      name: "Produtos",
      route: "/produtos",
      subItem: null,
    },
    {
      name: "Estoque",
      route: "/estoque",
      subItem: null,
    },
    {
      name: "Cadastros",
      route: "#",
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
  