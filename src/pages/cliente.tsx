import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { ClientTemplate } from "../template/Cliente";
import Head from "next/head";

export default function Clients() {
  return (
    <>
      <Head>
        <title>Cliente | ODIN</title>
      </Head>
      <ClientTemplate />
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
