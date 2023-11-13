import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import ServiceOrderTemplate from "../template/OrdemServico";
import Head from "next/head";

export default function ServiceOrder() {
  return (
    <>
      <Head>
        <title>Ordem de Serviço | ODIN</title>
      </Head>
      <ServiceOrderTemplate />
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
