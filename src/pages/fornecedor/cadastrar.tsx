import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SupplierFormTemplate from "./template";
import axios from "axios";

export default function NewSupplier() {
  const { push } = useRouter();

  // Cadastrar Fornecedor
  const [companyName, setCompanyName] = useState<string>("")
  const [businessName, setBusinessName] = useState<string>("")
  const [isLaboratory, setIsLaboratory] = useState<boolean>(false)

  // Endereço
  const [zipCode, setzipCode] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [district, setDistrict] = useState<string>("")
  const [numberAddress, setnumberAddress] = useState<string>("")
  const [complement, setComplement] = useState<string>("")
  const [city, setCity] = useState<string>("")

  const handleNewSupplier = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = { companyName, businessName, isLaboratory, zipCode, address, district, numberAddress, complement, city }
    await axios.post('/api/supplier', data)

    // reset
    // setSupplier("")
    // setIsActive(false)

    goBack()
  }

  const goBack = () => {
    push('/fornecedor')
  }

  return (
    <SupplierFormTemplate
      companyName={companyName}
      setCompanyName={setCompanyName}
      businessName={businessName}
      setBusinessName={setBusinessName}
      isLaboratory={isLaboratory}
      setIsLaboratory={setIsLaboratory}
      zipCode={zipCode}
      setzipCode={setzipCode}
      address={address}
      setAddress={setAddress}
      district={district}
      setDistrict={setDistrict}
      numberAddress={numberAddress}
      setnumberAddress={setnumberAddress}
      complement={complement}
      setComplement={setComplement}
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
