import { GetServerSideProps } from "next";
import ResetPasswordTemplate from "../template/RedefinirSenha";

export default function ResetPassword() {
  return <ResetPasswordTemplate />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};