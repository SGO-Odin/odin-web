import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SupplierFormTemplate from "./template";
import axios from "axios";

export default function NewSupplier() {
  const { push } = useRouter();

  // Cadastrar Fornecedor
  const [tradingName, setTradingName] = useState<string>("")
  const [companyName, setCompanyName] = useState<string>("")
  const [isLaboratory, setIsLaboratory] = useState<boolean>(false)

  // Endereço
  const [zipCode, setZipCode] = useState<string>("")
  const [acronym, setAcronym] = useState<string>("")
  const [stateName, setStateName] = useState<string>("")
  const [isFederalDistrict, setIsFederalDistrict] = useState<boolean>(false)
  const [publicPlaceName, setPublicPlaceName] = useState<string>("")
  const [publicPlaceType, setPublicPlaceType] = useState<string>("STREET")
  const [district, setDistrict] = useState<string>("")
  const [number, setNumber] = useState<string>("")
  const [complement, setComplement] = useState<string>("")
  const [reference, setReference] = useState<string>("")
  const [city, setCity] = useState<string>("")

  const handleNewSupplier = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = { companyName, tradingName, isLaboratory, zipCode, acronym, stateName, isFederalDistrict, publicPlaceName, publicPlaceType, district, number, complement, reference, city }

    await axios.post('/api/supplier', data)

    goBack()
  }

  const goBack = () => {
    push('/fornecedor')
  }

  return (
    <SupplierFormTemplate
      companyName={companyName}
      setCompanyName={setCompanyName}
      tradingName={tradingName}
      setTradingName={setTradingName}
      isLaboratory={isLaboratory}
      setIsLaboratory={setIsLaboratory}

      zipCode={zipCode}
      setZipCode={setZipCode}
      acronym={acronym}
      setAcronym={setAcronym}
      stateName={stateName}
      setStateName={setStateName}
      isFederalDistrict={isFederalDistrict}
      setIsFederalDistrict={setIsFederalDistrict}
      publicPlaceName={publicPlaceName}
      setPublicPlaceName={setPublicPlaceName}
      publicPlaceType={publicPlaceType}
      setPublicPlaceType={setPublicPlaceType}
      district={district}
      setDistrict={setDistrict}
      number={number}
      setNumber={setNumber}
      complement={complement}
      setComplement={setComplement}
      reference={reference}
      setReference={setReference}
      city={city}
      setCity={setCity}

      handleSupplier={handleNewSupplier}
      goBack={goBack}
      title="Cadastrar Fornecedor"
      paragraph="Cadastre um novo fornecedor"
    />
  );
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
