import { ButtonsTertiary } from '@/src/components/buttons/tertiary';
import { Hero } from '@/src/components/hero';
import LayoutDefault from '@/src/components/layoutDefault';
import { MdCancel } from 'react-icons/md';
import { ButtonsPrimary } from "@/src/components/buttons/primary";
import { TextField } from "@/src/components/textField";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Select } from "@/src/components/select";
import { Toggle } from "@/src/components/toggle";
import './productFormTemplate.scss'
import { HeroSecundary } from "@/src/components/commons/hero-secundary";
import { BsEyeglasses } from "react-icons/bs";
import { IBrands, ISupplier } from '@/src/interface/datas';
import axios from 'axios';
import { numberValidation } from '@/src/hook/validation-number';


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
    supplier: number
    setSupplier: Dispatch<SetStateAction<number>>
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
    supplier,
    setSupplier,
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

    const [listBrands, setListBrands] = useState<IBrands[]>([])
    const [listSupplier, setListSupplier] = useState<ISupplier[]>([])

    useEffect(() => {
        axios.get('/api/brands').then(response => {
            setListBrands(response.data)
        })

        axios.get('/api/supplier').then(response => {
            setListSupplier(response.data)
        })
    }, [])

    const valueBrand = listBrands.map((item) => item._id === brands ? item.brands : null)
    const valueSupplier = listSupplier.map((item) => item._id === supplier ? item.companyName : null)

    const handleBrands = (value: string) => {
        setBrands(listBrands.map((item) => item.brands === value ? item._id : null)[0])
    }
    const handleSupplier = (value: string) => {
        setSupplier(listSupplier.map((item) => item.companyName === value ? item._id : null)[0])
    }

    useEffect(() => {
        if (selling && cost) {
            const profit = Number(selling) - Number(cost)
            setProfit(profit.toString())

            const percent = ((Number(selling) - Number(cost)) / Number(cost)) * 100
            setPercentProfit(percent.toPrecision(4).toString())
        }
    }, [selling, cost])


    const optionsBrands: string[] = listBrands.map((objeto) => objeto.brands);
    const optionsSupplier: string[] = listSupplier.map((objeto) => objeto.companyName);
    const optionsUnit: string[] = ["Frasco", "Kit", "Par", "Peça", "Unidade"]

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
                                    placeholder='Escolha uma unidade'
                                    name="unit"
                                    value={unit}
                                    onChange={(ev) => setUnit(ev.target.value)}
                                    label="UNIDADE"
                                    id="unit"
                                    options={optionsUnit}
                                    required={true} />
                            </div>
                        </div>
                        <div className="products__form__content__inputs">
                            <div className="input">
                                <Select
                                    name="brands"
                                    placeholder='Selecione uma Marca'
                                    value={valueBrand[0]}
                                    onChange={(ev) => handleBrands(ev.target.value)}
                                    label="GRIFES"
                                    id="brands"
                                    options={optionsBrands}
                                    required={true} />
                            </div>
                            <div className="input">
                                <Select
                                    name="supplier"
                                    placeholder='Selecione um Fornecedor'
                                    value={valueSupplier[0]}
                                    onChange={(ev) => handleSupplier(ev.target.value)}
                                    label="FORNECEDOR"
                                    id="supplier"
                                    options={optionsSupplier}
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

                    <div className="products__form__content">
                        <HeroSecundary title="Informações de Preço e Estoque" />
                        <div className="products__form__content__inputs">
                            <div className="input">
                                <TextField
                                    name="cost"
                                    placeholder="ex: 3000"
                                    value={cost}
                                    onChange={(ev) => setCost(numberValidation(ev.target.value, cost))}
                                    label="CUSTO (R$)"
                                    id="cost"
                                    required={isStockControl ? true : false}
                                />
                            </div>
                            <div className="input">
                                <TextField
                                    name="percentProfit"
                                    placeholder="ex (%): 50"
                                    value={percentProfit}
                                    onChange={(ev) => setPercentProfit(numberValidation(ev.target.value, percentProfit))}
                                    label="LUCRO (%)"
                                    id="percentProfit"
                                    required={isStockControl ? true : false}
                                    disabled={true}
                                />
                            </div>
                            <div className="input">
                                <TextField
                                    name="profit"
                                    placeholder="ex: 150"
                                    value={profit}
                                    onChange={(ev) => setProfit(numberValidation(ev.target.value, profit))}
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
                                    value={selling}
                                    onChange={(ev) => setSelling(numberValidation(ev.target.value, selling))}
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