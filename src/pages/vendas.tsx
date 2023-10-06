import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import SaleTemplate from "../template/Vendas";

export default function Sales() {
  return <SaleTemplate />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { "odinauth.token": token } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
