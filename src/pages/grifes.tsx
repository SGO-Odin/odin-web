import { GetServerSideProps } from "next";
import { BrandsTemplate } from "../template/Grifes";
import { parseCookies } from "nookies";
import Head from "next/head";

export default function Brands() {

  return (
    <>
      <Head>
        <title>Grifes | ODIN</title>
      </Head>
      <BrandsTemplate />
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
