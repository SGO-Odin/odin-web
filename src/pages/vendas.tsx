import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function Sales() {
  return <h1>Vendas</h1>;
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
