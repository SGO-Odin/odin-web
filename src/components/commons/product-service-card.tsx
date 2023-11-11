import { MdDelete } from "react-icons/md";
import { ButtonsSecundary } from "../buttons/secundary";
import { Select } from "../select";
import RowItem from "../table/body/rowItem";
import Head from "../table/head";
import { TextField } from "../textField";
import { HeroSecundary } from "./hero-secundary";
import CardTotal from "./card-total";
import { handleFormatNumber } from "@/src/hook/format-number";
import { Dispatch, SetStateAction } from "react";
import { IItemSelect } from "@/src/interface/utils";
import { numberValidation } from "@/src/hook/validation-number";
import { IRowsProductTable } from "@/src/interface/datas";
import './product-service-card.scss'

const columns = ["Ref", "Unidade", "Produto / Serviço", "Quantidade", "Val. Unit.", "Val. Total"];

interface IProductServiceCard {
    idProduct: number
    setIdProduct: Dispatch<SetStateAction<number>>
    optionsProduct: IItemSelect[]
    quantity: string
    setQuantity: Dispatch<SetStateAction<string>>
    coast: string
    setCoast: Dispatch<SetStateAction<string>>
    handleDataProduct: () => void
    dataProduct: IRowsProductTable[]
    handleDeleteRowProduct: (_id: number) => void

    valueTotal: string
    setValueTotal: Dispatch<SetStateAction<string>>
    valueAmount: string
    setValueAmount: Dispatch<SetStateAction<string>>

    percentDiscount: string
    setPercentDiscount: Dispatch<SetStateAction<string>>
    discount: string
    setDiscount: Dispatch<SetStateAction<string>>
    percentAdditional: string
    setPercentAdditional: Dispatch<SetStateAction<string>>
    additional: string
    setAdditional: Dispatch<SetStateAction<string>>
}

export default function ProductServiceCard({
    idProduct,
    setIdProduct,
    optionsProduct,
    quantity,
    setQuantity,
    coast,
    setCoast,
    handleDataProduct,
    dataProduct,
    handleDeleteRowProduct,

    valueTotal,
    setValueTotal,
    valueAmount,
    setValueAmount,
    percentDiscount,
    setPercentDiscount,
    discount,
    setDiscount,
    percentAdditional,
    setPercentAdditional,
    additional,
    setAdditional
}: IProductServiceCard) {

    return (
        <div className="product-service-card__form__content">
            <HeroSecundary title="Produtos e Serviços" />
            <div className="product-service-card__form__content__inputs">
                <div className="input">
                    <div>
                        <Select
                            item={idProduct}
                            setItem={setIdProduct}
                            placeholder='ex: Ray Ban'
                            label="PESQUISAR PRODUTOS:"
                            options={optionsProduct} />
                    </div>
                </div>
                <div className="input">
                    <TextField
                        name="quantity"
                        placeholder="ex: 5"
                        value={quantity}
                        onChange={(ev) => setQuantity(numberValidation(ev.target.value))}
                        label="QUANTIDADE:"
                        id="quantity"
                    />
                </div>
                <div className="input">
                    <TextField
                        name="coast"
                        placeholder='R$ 0,00'
                        value={handleFormatNumber(coast)}
                        onChange={(ev) => setCoast(ev.target.value)}
                        label="VALOR:"
                        id="coast"
                        disabled={true} />
                </div>
                <div className="input">
                    <ButtonsSecundary type='button' onClick={handleDataProduct}>
                        Adicionar Item
                    </ButtonsSecundary>
                </div>
            </div>
            <div className="container-table__content">
                <table className="table">
                    <Head columns={columns} isButton={true} />
                    <tbody className="body">
                        {!!dataProduct && dataProduct.map((item, index) => (
                            <tr key={item._id} className='body__row'>
                                <RowItem label={item.ref} isActive={null} />
                                <RowItem label={item.unidade} isActive={null} />
                                <RowItem label={item.produto} isActive={null} />
                                <RowItem label={item.quantidade} isActive={null} />
                                <RowItem label={handleFormatNumber(item.valueUnit)} isActive={null} />
                                <RowItem label={handleFormatNumber(item.valueTot)} isActive={null} />
                                <td className={'row buttons'}>
                                    <button onClick={() => handleDeleteRowProduct(item._id)} type='button'>
                                        <MdDelete size={24} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <CardTotal
                valueTotal={valueTotal}
                valueAmount={valueAmount}
                setValueTotal={setValueTotal}
                setValueAmount={setValueAmount}
                percentAdditional={percentAdditional}
                percentDiscount={percentDiscount}
                setPercentAdditional={setPercentAdditional}
                setPercentDiscount={setPercentDiscount}
                additional={additional}
                discount={discount}
                setAdditional={setAdditional}
                setDiscount={setDiscount} />
        </div>
    );
}
