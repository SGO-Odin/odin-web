import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { SupplierTemplete } from "../template/Fornecedor";

export default function Supplier() {
  return <SupplierTemplete/>;
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
