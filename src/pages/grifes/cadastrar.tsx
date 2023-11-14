import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import BrandsFormTemplate from "./template";
import Head from "next/head";
import axiosFrontend from "http"

export default function AddBrands() {
  const { push } = useRouter();
  const [name, setName] = useState<string>('')

  const handleNewbrands = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = { name }
    const { 'odinauth.token': token } = parseCookies()

    // create
    axios.post('/api/brands', data, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        // reset
        setName('')

        if (res.status == 201) goBack()
      })
      .catch((error) => console.log(error))
  }

  const goBack = () => {
    push('/grifes')
  }

  return (
    <>
      <Head>
        <title>Cadastrar Grifes | ODIN</title>
      </Head>
      <BrandsFormTemplate
        handleBrands={handleNewbrands}
        name={name}
        setName={setName}
        goBack={goBack}
        title="Cadastrar Grife"
        paragraph="Esta página de foi criada para facilitar o acesso às informações sobre grifes disponíveis. Encontre rapidamente o que você precisa aqui." />
    </>
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
