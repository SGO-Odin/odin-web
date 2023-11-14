import { ButtonsTertiary } from '@/src/components/buttons/tertiary';
import { Hero } from '@/src/components/hero';
import LayoutDefault from '@/src/components/layoutDefault';
import { MdCancel } from 'react-icons/md';
import { ButtonsPrimary } from "@/src/components/buttons/primary";
import { TextField } from "@/src/components/textField";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { Select } from "@/src/components/select";
import { Toggle } from "@/src/components/toggle";
import './productFormTemplate.scss'
import { HeroSecundary } from "@/src/components/commons/hero-secundary";
import { BsEyeglasses } from "react-icons/bs";
import { IBrands, ISupplier } from '@/src/interface/datas';
import axios from 'axios';
import { numberValidation } from '@/src/hook/validation-number';
import { handleFormatNumber } from '@/src/hook/format-number';
import { IItemSelect } from '@/src/interface/utils';
import typeUnit from '@/src/data/typeUnit.json'
import { parseCookies } from "nookies";


interface IProductFormTemplate {
    cost: string
    setCost: Dispatch<SetStateAction<string>>
    percentProfit: string
    setPercentProfit: Dispatch<SetStateAction<string>>
    profit: string
    setProfit: Dispatch<SetStateAction<string>>
    selling: string
    setSelling: Dispatch<SetStateAction<string>>
    stockMin: string
    setStockMin: Dispatch<SetStateAction<string>>
    stockCurrent: string
    setStockCurrent: Dispatch<SetStateAction<string>>
    location: string
    setLocation: Dispatch<SetStateAction<string>>
    reference: string
    setReference: Dispatch<SetStateAction<string>>
    nameProduct: string
    setNameProduct: Dispatch<SetStateAction<string>>

    unit: string
    setUnit: Dispatch<SetStateAction<string>>
    brands: number
    setBrands: Dispatch<SetStateAction<number>>
    purveyor: number
    setPurveyor: Dispatch<SetStateAction<number>>
    isActive: boolean
    setIsActive: Dispatch<SetStateAction<boolean>>
    isStockControl: boolean
    setIsStockControl: Dispatch<SetStateAction<boolean>>
    isService: boolean
    setIsService: Dispatch<SetStateAction<boolean>>
    handleProduct: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
    goBack: () => void
    title: string
    paragraph: string
}
export default function ProductFormTemplate({
    cost,
    setCost,
    percentProfit,
    setPercentProfit,
    profit,
    setProfit,
    selling,
    setSelling,
    stockMin,
    setStockMin,
    stockCurrent,
    setStockCurrent,
    location,
    setLocation,
    reference,
    setReference,
    nameProduct,
    setNameProduct,
    unit,
    setUnit,
    brands,
    setBrands,
    purveyor,
    setPurveyor,
    isActive,
    setIsActive,
    isStockControl,
    setIsStockControl,
    isService,
    setIsService,
    handleProduct,
    goBack,
    title,
    paragraph
}: IProductFormTemplate) {
    const [optionsBrands, setOptionsBrands] = useState<IItemSelect[]>([])
    const [optionsSupplier, setOptionsSupplier] = useState<IItemSelect[]>([])
    const [optionsUnit, setOptionsUnit] = useState<IItemSelect[]>(typeUnit || [])
    const [currentTypeUnit, setCurrentTypeUnit] = useState<number>()

    const { 'odinauth.token': token } = parseCookies()

    useEffect(() => {
        axios.get('/api/brands',{ headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
                if (response.status == 200) {
                    setBrands(response.data.response)

                    const listSelectBrands = !!response.data.response && response.data.response.map(function (item) {
                        const data: IItemSelect = {
                            _id: item.id,
                            name: item.name
                        }
                        return data
                    })
                    setOptionsBrands(listSelectBrands)
                }
            })
            .catch((error) => {
                console.log(error.response.data)
            })

        axios.get('/api/purveyor',{ headers: { "Authorization": `Bearer ${token}` } }).then(response => {
            const listSelectSupplier = !!response.data.response && response.data.response.map(function (item) {
                const data: IItemSelect = {
                    _id: item.id,
                    name: item.tradingName
                }
                return data
            })
            setOptionsSupplier(listSelectSupplier)
        })

        if (unit) {
            const idTypeUnit = optionsUnit.find((item) => item.value === unit ? item : null)
            setCurrentTypeUnit(idTypeUnit._id)
        }
    }, [])

    useEffect(() => {
        if (selling && cost) {
            const valueSelling = selling.replace(/\D/g, ''); // Retira qualquer caracter não numerico
            const valueCost = cost.replace(/\D/g, ''); // Retira qualquer caracter não numerico

            const profit = Number(valueSelling) - Number(valueCost)
            setProfit(profit.toString())

            const percent = ((Number(valueSelling) - Number(valueCost)) / Number(valueCost)) * 100
            setPercentProfit(percent.toFixed(2).toString())
        }
    }, [selling, cost])

    useEffect(() => {
        if (currentTypeUnit) {
            const valueTypeUnit = optionsUnit.find((item) => item._id === currentTypeUnit ? item : null)
            setUnit(valueTypeUnit.value)
        }
    }, [currentTypeUnit])

    return (
        <LayoutDefault>
            <div className="products">
                <form onSubmit={handleProduct} className="products__form">
                    <Hero
                        isButtonPrymary={false}
                        title={title}
                        paragraph={paragraph}>
                    </Hero>
                    <div className="products__form__content">
                        <HeroSecundary title="Dados Principais" />
                        <div className="products__form__content__inputs">
                            <div className="input">
                                <TextField
                                    name="reference"
                                    placeholder="3000"
                                    value={reference}
                                    onChange={(ev) => setReference(numberValidation(ev.target.value, reference))}
                                    label="REFERÊNCIA"
                                    id="reference"
                                    required={true}
                                />
                            </div>
                            <div className="input">
                                <TextField
                                    name="nameProduct"
                                    placeholder="Digite o nome do produto"
                                    value={nameProduct}
                                    onChange={(ev) => setNameProduct(ev.target.value)}
                                    label="NOME DO PRODUTO"
                                    id="nameProduct"
                                    required={true}
                                />
                            </div>
                            <div className="input">
                                <Select
                                    placeholder='Escolha uma unidade:'
                                    label="UNIDADE"
                                    options={optionsUnit}
                                    item={currentTypeUnit}
                                    setItem={setCurrentTypeUnit} />
                            </div>
                        </div>
                        <div className="products__form__content__inputs">
                            <div className="input">
                                <Select
                                    placeholder='Selecione uma Marca:'
                                    label="GRIFES"
                                    options={optionsBrands}
                                    item={brands}
                                    setItem={setBrands} />
                            </div>
                            <div className="input">
                                <Select
                                    placeholder='Selecione um Fornecedor:'
                                    label="FORNECEDOR"
                                    options={optionsSupplier}
                                    item={purveyor}
                                    setItem={setPurveyor} />
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

                    <div className="products__form__content">
                        <HeroSecundary title="Informações de Preço e Estoque" />
                        <div className="products__form__content__inputs">
                            <div className="input">
                                <TextField
                                    name="cost"
                                    placeholder="ex: 3000"
                                    value={handleFormatNumber(cost)}
                                    onChange={(ev) => setCost(ev.target.value)}
                                    label="CUSTO (R$)"
                                    id="cost"
                                    required={isStockControl ? true : false}
                                />
                            </div>
                            <div className="input">
                                <TextField
                                    name="percentProfit"
                                    value={percentProfit}
                                    label="LUCRO (%)"
                                    id="percentProfit"
                                    required={isStockControl ? true : false}
                                    disabled={true}
                                />
                            </div>
                            <div className="input">
                                <TextField
                                    name="profit"
                                    value={handleFormatNumber(profit)}
                                    label="LUCRO (R$)"
                                    id="profit"
                                    required={isStockControl ? true : false}
                                    disabled={true}
                                />
                            </div>
                            <div className="input">
                                <TextField
                                    name="selling"
                                    placeholder="ex: 450"
                                    value={handleFormatNumber(selling)}
                                    onChange={(ev) => setSelling(ev.target.value)}
                                    label="VENDA (R$)"
                                    id="selling"
                                    required={isStockControl ? true : false}
                                />
                            </div>
                            {isStockControl && (
                                <div className="rows">
                                    <div className="input">
                                        <TextField
                                            name="stockCurrent"
                                            placeholder="ex: 235"
                                            value={stockCurrent}
                                            onChange={(ev) => setStockCurrent(numberValidation(ev.target.value, stockCurrent))}
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
                                            onChange={(ev) => setStockMin(numberValidation(ev.target.value, stockMin))}
                                            label="EST. MÍN"
                                            id="stockMin"
                                            required={isStockControl ? true : false}
                                        />
                                    </div>
                                </div>
                            )}
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
                    <div className="products__form__buttons">
                        <div>
                            <ButtonsTertiary type='button' onClick={goBack}>
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