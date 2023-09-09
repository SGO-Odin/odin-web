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
          <div className="newBrands__form__content">
            <header className="newBrands__form__content__header">
              <h2 className="newBrands__form__content__header__title">
                Cadastrar Grifes
              </h2>
              <hr className="menu__mobile__line" />
            </header>
            <div className="newBrands__form__content__inputs">
              <div>
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
              <div className="newBrands__form__content__inputs__check">
                <label htmlFor="brandsActive">ATIVO</label>
                <input
                  type="checkbox"
                  name="brandsActive"
                  id="brandsActive"
                  checked={isActive}
                  onChange={(ev) => setIsActive(ev.target.checked)}
                />
              </div>
            </div>
          </div>
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
