import { GetServerSideProps } from 'next';
import { RegisterTemplate } from '../template/Cadastrar'


export default function Register() {
  return (
    <RegisterTemplate />
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