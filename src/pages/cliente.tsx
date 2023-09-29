import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { ClientTemplate } from "../template/Cliente";

export default function Clients() {
  return <ClientTemplate />;
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
