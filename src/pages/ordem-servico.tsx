import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import ServiceOrderTemplate from "../template/OrdemServico";

export default function ServiceOrder() {
  return <ServiceOrderTemplate />;
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
