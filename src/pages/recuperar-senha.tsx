import { GetServerSideProps } from "next";
import { RecoverPasswordTemplate } from "../template/RecuperarSenha";

export default function RecoverPassword() {
  return (
    <RecoverPasswordTemplate />
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};