import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { PurveyorTemplete } from "../template/Fornecedor";
import { purveyorUseCases } from "../server/use-cases/purveyor";
import { IPurveyor } from "../server/entities/purveyor";

interface IPurveyors {
  purveyor: IPurveyor[]
}

export default function Purveyor(purveyor: IPurveyors) {

  return <PurveyorTemplete {...purveyor} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { "odinauth.token": token } = parseCookies(context);

  const purveyor = await purveyorUseCases.getAllPurveyors()

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      purveyor
    },
  };
};
