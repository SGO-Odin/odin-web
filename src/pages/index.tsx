import { GetServerSideProps } from "next";
import { DashboardTemplate } from "../template/Dashboard";
import { parseCookies } from "nookies";

export default function Dashboard() {
  return <DashboardTemplate />;
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
