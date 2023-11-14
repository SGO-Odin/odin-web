import { GetServerSideProps } from "next";
import { DashboardTemplate } from "../template/Dashboard";
import { parseCookies } from "nookies";
import Head from "next/head";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Home | ODIN</title>
      </Head>
      <DashboardTemplate />
    </>
  )
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
