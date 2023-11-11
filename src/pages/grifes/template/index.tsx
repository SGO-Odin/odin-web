import { ButtonsPrimary } from "@/src/components/buttons/primary";
import { ButtonsTertiary } from "@/src/components/buttons/tertiary";
import { Hero } from "@/src/components/hero";
import LayoutDefault from "@/src/components/layoutDefault";
import { TextField } from "@/src/components/textField";
import { Dispatch, SetStateAction } from "react";
import { BsEmojiSunglassesFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import "./brands-form-template.scss";

interface IBrandsFormTemplate {
    handleBrands: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
    name: string
    setName: Dispatch<SetStateAction<string>>
    goBack: () => void
    title: string
    paragraph: string
}

export default function BrandsFormTemplate({ handleBrands, name, setName, goBack, title, paragraph }: IBrandsFormTemplate) {

    return (
        <LayoutDefault>
            <div className="brands-form-template">
                <form onSubmit={handleBrands} className="brands-form-template__form">
                    <Hero
                        isButtonPrymary={false}
                        title={title}
                        paragraph={paragraph}>
                        <div className="brands-form-template__form__inputs">
                            <div className="input">
                                <TextField
                                    name="brands-form-template"
                                    placeholder="Ex: Diesel"
                                    value={name}
                                    onChange={(ev) => setName(ev.target.value)}
                                    label="NOME DA GRIFE"
                                    id="brands-form-template"
                                />
                            </div>
                        </div>
                    </Hero>
                    <div className="brands-form-template__form__buttons">
                        <div>
                            <ButtonsTertiary type="button" onClick={goBack}>
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
