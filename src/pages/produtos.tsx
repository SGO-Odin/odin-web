import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import ProductTemplate from "../template/Produtos";

export default function Products() {
  return <ProductTemplate/>;
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
