import { GetServerSideProps } from "next";
import { BrandsTemplate } from "../template/Grifes";
import { parseCookies } from "nookies";

export default function Brands() {
  return <BrandsTemplate />;
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
