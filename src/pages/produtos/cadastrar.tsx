import { useRouter } from "next/navigation";
import { ButtonsTertiary } from '@/src/components/buttons/tertiary';
import { Hero } from '@/src/components/hero';
import LayoutDefault from '@/src/components/layoutDefault';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { MdCancel } from 'react-icons/md';
import { ButtonsPrimary } from "@/src/components/buttons/primary";
import { TextField } from "@/src/components/textField";
import { useState } from "react";
import { Select } from "@/src/components/select";
import { Toggle } from "@/src/components/toggle";
import './newProducts.scss'
import { HeroSecundary } from "@/src/components/commons/hero-secundary";
import { BsEyeglasses } from "react-icons/bs";

export default function NewProduct() {
    const { push } = useRouter();
    const [cost, setCost] = useState<string>("0")
    const [percentProfit, setPercentProfit] = useState<string>("0")
    const [profit, setProfit] = useState<string>("0")
    const [selling, setSelling] = useState<string>("0")
    const [stockMin, setStockMin] = useState<string>("0")
    const [stockCurrent, setStockCurrent] = useState<string>("0")
    const [location, setLocation] = useState<string>("")

    const [reference, setReference] = useState<string>("")
    const [nameProduct, setNameProduct] = useState<string>("")
    const [unit, setUnit] = useState<string>("")
    const [brands, setBrands] = useState<string>("")
    const [supplier, setSupplier] = useState<string>("")
    const [isActive, setIsActive] = useState<boolean>(false)
    const [isStockControl, setIsStockControl] = useState<boolean>(false)
    const [isService, setIsService] = useState<boolean>(false)

    const handleNewProduct = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(`cost: ${cost}`)
        console.log(`percentProfit: ${percentProfit}`)
        console.log(`profit: ${profit}`)
        console.log(`selling: ${selling}`)
        console.log(`stockMin: ${stockMin}`)
        console.log(`stockCurrent: ${stockCurrent}`)
        console.log(`location: ${location}`)
        console.log(`reference: ${reference}`)
        console.log(`nameProduct: ${nameProduct}`)
        console.log(`unit: ${unit}`)
        console.log(`brands: ${brands}`)
        console.log(`supplier: ${supplier}`)
        console.log(`isActive: ${isActive}`)
        console.log(`isStockControl: ${isStockControl}`)
        console.log(`isService: ${isService}`)
        // const data = { brands, isActive }
        // create
        // await axios.post('#', data)

        // reset

        goBack()
    }

    const goBack = () => {
        push('/produtos')
    }
    return (
        <LayoutDefault>

            <div className="products">
                <form onSubmit={handleNewProduct} className="products__form">
                    <Hero
                        isButtonPrymary={false}
                        title="Cadastrar Produto"
                        paragraph={`A página de cadastro de produtos permite adicionar novos produtos ao estoque da ótica. Insira detalhes, como nome, preço e descrição, para atualizar nosso catálogo.`}>
                    </Hero>
                    <div className="products__form__content">
                        <HeroSecundary title="Dados Principais" />
                        <div className="products__form__content__inputs">
                            <div className="input">
                                <TextField
                                    name="reference"
                                    placeholder="3000"
                                    value={reference}
                                    onChange={(ev) => setReference(ev.target.value)}
                                    label="REFERÊNCIA"
                                    id="reference"
                                    required={true}
                                />
                            </div>
                            <div className="input">
                                <TextField
                                    name="nameProduct"
                                    placeholder=""
                                    value={nameProduct}
                                    onChange={(ev) => setNameProduct(ev.target.value)}
                                    label="NOME DO PRODUTO"
                                    id="nameProduct"
                                    required={true}
                                />
                            </div>
                            <div className="input">
                                <Select
                                    name="unit"
                                    value={unit}
                                    onChange={(value) => setUnit(value)}
                                    label="UNIDADE"
                                    id="unit"
                                    required={true} />
                            </div>
                        </div>
                        <div className="products__form__content__inputs">
                            <div className="input">
                                <Select
                                    name="brands"
                                    value={brands}
                                    onChange={(value) => setBrands(value)}
                                    label="GRIFES"
                                    id="brands"
                                    required={true} />
                            </div>
                            <div className="input">
                                <Select
                                    name="supplier"
                                    value={supplier}
                                    onChange={(value) => setSupplier(value)}
                                    label="FORNECEDOR"
                                    id="supplier"
                                    required={true} />
                            </div>
                            <div className="input-toggle">
                                <div>
                                    <Toggle
                                        label="ATIVO"
                                        name="isActive"
                                        id="isActive"
                                        isActive={isActive}
                                        onChange={(ev) => setIsActive(ev.target.checked)} />
                                </div>
                                <div>
                                    <Toggle
                                        label="CONTROLAR ESTOQUE"
                                        name="isStockControl"
                                        id="isStockControl"
                                        isActive={isStockControl}
                                        onChange={(ev) => setIsStockControl(ev.target.checked)} />
                                </div>
                                <div>
                                    <Toggle
                                        label="SERVIÇO"
                                        name="isService"
                                        id="isService"
                                        isActive={isService}
                                        onChange={(ev) => setIsService(ev.target.checked)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {isStockControl && (
                        <div className="products__form__content">
                            <HeroSecundary title="Informações de Preço e Estoque" />
                            <div className="products__form__content__inputs">
                                <div className="input">
                                    <TextField
                                        name="cost"
                                        placeholder="ex: 3000"
                                        value={cost}
                                        onChange={(ev) => setCost(ev.target.value)}
                                        label="CUSTO"
                                        id="cost"
                                        required={isStockControl ? true : false}
                                    />
                                </div>
                                <div className="input">
                                    <TextField
                                        name="percentProfit"
                                        placeholder="ex (%): 50"
                                        value={percentProfit}
                                        onChange={(ev) => setPercentProfit(ev.target.value)}
                                        label="% LUCRO"
                                        id="percentProfit"
                                        required={isStockControl ? true : false}
                                    />
                                </div>
                                <div className="input">
                                    <TextField
                                        name="profit"
                                        placeholder="ex: 150"
                                        value={profit}
                                        onChange={(ev) => setProfit(ev.target.value)}
                                        label="LUCRO"
                                        id="profit"
                                        required={isStockControl ? true : false}
                                    />
                                </div>
                                <div className="input">
                                    <TextField
                                        name="selling"
                                        placeholder="ex: 450"
                                        value={selling}
                                        onChange={(ev) => setSelling(ev.target.value)}
                                        label="VENDA"
                                        id="selling"
                                        required={isStockControl ? true : false}
                                    />
                                </div>
                                <div className="input">
                                    <TextField
                                        name="stockCurrent"
                                        placeholder="ex: 235"
                                        value={stockCurrent}
                                        onChange={(ev) => setStockCurrent(ev.target.value)}
                                        label="EST. ATUAL"
                                        id="stockCurrent"
                                        required={isStockControl ? true : false}
                                    />
                                </div>
                                <div className="input">
                                    <TextField
                                        name="stockMin"
                                        placeholder="ex: 15"
                                        value={stockMin}
                                        onChange={(ev) => setStockMin(ev.target.value)}
                                        label="EST. MÍN"
                                        id="stockMin"
                                        required={isStockControl ? true : false}
                                    />
                                </div>
                                <div className="input">
                                    <TextField
                                        name="location"
                                        placeholder="ex: Gaveta B"
                                        value={location}
                                        onChange={(ev) => setLocation(ev.target.value)}
                                        label="LOCALIZAÇÃO"
                                        id="location"
                                        required={isStockControl ? true : false}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="products__form__buttons">
                        <div>
                            <ButtonsTertiary onClick={() => goBack()}>
                                <MdCancel size={24} />
                                Cancelar
                            </ButtonsTertiary>
                        </div>
                        <div>
                            <ButtonsPrimary>
                                <BsEyeglasses size={24} />
                                Salvar Produto
                            </ButtonsPrimary>
                        </div>
                    </div>
                </form>
            </div>
        </LayoutDefault>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { "odinauth.token": token } = parseCookies(ctx);

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

        }
    }
}