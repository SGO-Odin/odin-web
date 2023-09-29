import LayoutDefault from "@/src/components/layoutDefault";
import "./newBrands.scss";
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

export default function NewBrands() {
  const { push } = useRouter();
  const [brands, setBrands] = useState<string>("")
  const [isActive, setIsActive] = useState<boolean>(false)

  const handleNewbrands = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(brands)
    console.log(isActive)

    const data = { brands, isActive }
    // create
    // await axios.post('#', data)

    // reset
    setBrands("")
    setIsActive(false)

    goBack()
  }

  const goBack = () => {
    push('/grifes')
  }

  return (
    <LayoutDefault>
      <div className="newBrands">
        <form onSubmit={handleNewbrands} className="newBrands__form">
          <Hero
            isButtonPrymary={false}
            title="Cadastrar Grife"
            paragraph={`Esta página de foi criada para facilitar o acesso às informações sobre grifes disponíveis. Encontre rapidamente o que você precisa aqui.`}>
            <div className="newBrands__form__inputs">
              <div className="input">
                <TextField
                  name="newBrands"
                  placeholder="Ex: Diesel"
                  value={brands}
                  onChange={(ev) => setBrands(ev.target.value)}
                  label="NOME DA GRIFE"
                  id="newBrands"
                  required={true}
                />
              </div>
              <div className="newBrands__form__inputs">
                <Toggle
                  name="toggle-brand"
                  isActive={isActive}
                  onChange={(ev) => setIsActive(ev.target.checked)}
                  label="ATIVO"
                  id="toggle-brand" />

              </div>
            </div>
          </Hero>
          <div className="newBrands__form__buttons">
            <div>
              <ButtonsTertiary onClick={() => goBack()}>
                <MdCancel size={24} />
                Cancelar
              </ButtonsTertiary>
            </div>
            <div>
              <ButtonsPrimary>
                <BsEmojiSunglassesFill size={24} />
                Salvar Grife
              </ButtonsPrimary>
            </div>
          </div>
        </form>
      </div>
    </LayoutDefault>
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
