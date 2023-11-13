import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import SaleTemplate from "../template/Vendas";
import Head from "next/head";

export default function Sales() {
  return (
    <>
      <Head>
        <title>Vendas | ODIN</title>
      </Head>
      <SaleTemplate />
    </>
  );
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
