import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import ProductTemplate from "../template/Produtos";
import Head from "next/head";

export default function Products() {
  return (
    <>
      <Head>
        <title>Produtos | ODIN</title>
      </Head>
      <ProductTemplate />
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
