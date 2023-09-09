import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function ServiceOrder() {
  return <h1>Ordem de Serviço</h1>;
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
