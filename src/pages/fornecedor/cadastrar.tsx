import LayoutDefault from "@/src/components/layoutDefault";
import "./newSupplier.scss";
import { TextField } from "@/src/components/textField";
import { ButtonsTertiary } from "@/src/components/buttons/tertiary";
import { ButtonsPrimary } from "@/src/components/buttons/primary";
import { BsEmojiSunglassesFill } from "react-icons/bs";
import { MdCancel, MdLocalShipping } from "react-icons/md";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Hero } from "@/src/components/hero";

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

  const [isActive, setIsActive] = useState<boolean>(false)

  const handleNewSupplier = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(companyName)
    console.log(businessName)
    console.log(isLaboratory)
    console.log(zipCode)
    console.log(address)
    console.log(district)
    console.log(numberAddress)
    console.log(complement)
    console.log(city)
    // console.log(isActive)

    // const data = { supplier, isActive }
    // create
    // await axios.post('#', data)

    // reset
    // setSupplier("")
    setIsActive(false)

    goBack()
  }

  const goBack = () => {
    push('/fornecedor')
  }

  return (
    <LayoutDefault>
      <div className="newSupplier">
        <form onSubmit={handleNewSupplier} className="newSupplier__form">
          <Hero
            isButtonPrymary={false}
            title="Cadastrar Fornecedor"
            paragraph={`Cadastre um novo fornecedor`}>
            <div className="newSupplier__form__content__inputs">
              <div>
                <TextField
                  name="companyName"
                  placeholder=""
                  value={companyName}
                  onChange={(ev) => setCompanyName(ev.target.value)}
                  label="NOME FANTASIA"
                  id="companyName"
                  required={true}
                />
              </div>
              <div>
                <TextField
                  name="businessName"
                  placeholder=""
                  value={businessName}
                  onChange={(ev) => setBusinessName(ev.target.value)}
                  label="RAZÃO SOCIAL"
                  id="businessName"
                  required={true}
                />
              </div>
              <div className="newSupplier__form__content__inputs__check">
                <label htmlFor="SupplierActive">LABORATÓRIO</label>
                <input
                  type="checkbox"
                  name="isLaboratory"
                  id="isLaboratory"
                  checked={isLaboratory}
                  onChange={(ev) => setIsLaboratory(ev.target.checked)}
                />
              </div>
            </div>
          </Hero>
          <div className="newSupplier__form__content">
            <header className="newSupplier__form__content__header">
              <h2 className="newSupplier__form__content__header__title">
                Endereço
              </h2>
              <hr className="menu__mobile__line" />
            </header>
            <div className="newSupplier__form__content__inputs">
              <div>
                <TextField
                  name="zipCode"
                  placeholder=""
                  value={zipCode}
                  onChange={(ev) => setzipCode(ev.target.value)}
                  label="CEP"
                  id="zipCode"
                  required={true}
                />
              </div>
              <div>
                <TextField
                  name="address"
                  placeholder=""
                  value={address}
                  onChange={(ev) => setAddress(ev.target.value)}
                  label="ENDEREÇO"
                  id="address"
                  required={true}
                />
              </div>
              <div>
                <TextField
                  name="district"
                  placeholder=""
                  value={district}
                  onChange={(ev) => setDistrict(ev.target.value)}
                  label="BAIRRO"
                  id="district"
                  required={true}
                />
              </div>
            </div>
            <div className="newSupplier__form__content__inputs">
              <div>
                <TextField
                  name="numberAddress"
                  placeholder=""
                  value={numberAddress}
                  onChange={(ev) => setnumberAddress(ev.target.value)}
                  label="NÚMERO"
                  id="numberAddress"
                  required={true}
                />
              </div>
              <div>
                <TextField
                  name="complement"
                  placeholder=""
                  value={complement}
                  onChange={(ev) => setComplement(ev.target.value)}
                  label="COMPLEMENTO"
                  id="complement"
                  required={true}
                />
              </div>
              <div>
                <TextField
                  name="city"
                  placeholder=""
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                  label="CIDADE"
                  id="city"
                  required={true}
                />
              </div>
            </div>
          </div>
          <div className="newSupplier__form__buttons">
            <div>
              <ButtonsTertiary onClick={() => goBack()}>
                <MdCancel size={24} />
                Cancelar
              </ButtonsTertiary>
            </div>
            <div>
              <ButtonsPrimary>
                <MdLocalShipping size={24} />
                Salvar Fornecedor
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
