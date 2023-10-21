import LayoutDefault from "@/src/components/layoutDefault";
// import "./newBrands.scss";
import { TextField } from "@/src/components/textField";
import { ButtonsTertiary } from "@/src/components/buttons/tertiary";
import { ButtonsPrimary } from "@/src/components/buttons/primary";
import { BsEmojiSunglassesFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Hero } from "@/src/components/hero";
import { Toggle } from "@/src/components/toggle";
import BrandsFormTemplate from "./template";

export default function NewBrands() {
  const { push } = useRouter();
  const [brands, setBrands] = useState<string>("")
  const [isActive, setIsActive] = useState<boolean>(false)

  const handleNewbrands = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = { brands, isActive }
    // create
    await axios.post('/api/brands', data)

    // reset
    setBrands("")
    setIsActive(false)

    goBack()
  }

  const goBack = () => {
    push('/grifes')
  }

  return (
    <BrandsFormTemplate
      handleBrands={handleNewbrands}
      brands={brands}
      setBrands={setBrands}
      isActive={isActive}
      setIsActive={setIsActive}
      goBack={goBack}
      title="Cadastrar Grife"
      paragraph="Esta página de foi criada para facilitar o acesso às informações sobre grifes disponíveis. Encontre rapidamente o que você precisa aqui." />
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
