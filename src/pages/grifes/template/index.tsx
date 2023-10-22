import { ButtonsPrimary } from "@/src/components/buttons/primary";
import { ButtonsTertiary } from "@/src/components/buttons/tertiary";
import { Hero } from "@/src/components/hero";
import LayoutDefault from "@/src/components/layoutDefault";
import { TextField } from "@/src/components/textField";
import { Toggle } from "@/src/components/toggle";
import { Dispatch, SetStateAction } from "react";
import { BsEmojiSunglassesFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import "../newBrands.scss";

interface IBrandsFormTemplate {
    handleBrands: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
    brands: string
    setBrands: Dispatch<SetStateAction<string>>
    isActive: boolean
    setIsActive: Dispatch<SetStateAction<boolean>>
    goBack: () => void
    title: string
    paragraph: string
}

export default function BrandsFormTemplate({ handleBrands, brands, setBrands, isActive, setIsActive, goBack, title, paragraph }: IBrandsFormTemplate) {

    return (
        <LayoutDefault>
            <div className="newBrands">
                <form onSubmit={handleBrands} className="newBrands__form">
                    <Hero
                        isButtonPrymary={false}
                        title={title}
                        paragraph={paragraph}>
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
                            <ButtonsTertiary onClick={goBack}>
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
