import { ButtonsTertiary } from "@/src/components/buttons/tertiary";
import { Hero } from "@/src/components/hero";
import LayoutDefault from "@/src/components/layoutDefault";
import { TablesCustom } from "@/src/components/tablesCustom";
import { TextField } from "@/src/components/textField";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdAttachMoney, MdDelete, MdOutlineEdit, MdSearch } from "react-icons/md";
import './sale.scss'
import Head from "@/src/components/table/head";
import RowItem from "@/src/components/table/body/rowItem";
import { ButtonsEdit } from "@/src/components/buttons/edit";
import { ButtonsDelete } from "@/src/components/buttons/delete";
import axios from "axios";

const data = [
    { id: 1, Data: "01 / 11 / 2022", Hora: "11:25", Nome: "Adailton" },
    { id: 2, Data: "01 / 11 / 2022", Hora: "11:25", Nome: "Adailton" },
];

const columns = ["ID", "Data", "Hora", "Nome"];

export default function SaleTemplate() {
    const { push } = useRouter();

    const [numberSale, setNumberSale] = useState<string>("")
    const [name, setName] = useState<string>("")

    useEffect(() => {
        axios.get('/api/sale')
            .then(response => {

                console.log(response.data.response)
            })
            .catch((error) => {
                console.log(error.response.data)
            })
    }, [])

    const handlePushNewSale = () => {
        push("/vendas/cadastrar");
    };

    return (
        <LayoutDefault>
            <Hero
                isButtonPrymary={true}
                title="Consultar Vendas"
                paragraph={`Oferecemos uma visão completa das transações realizadas, facilitando o acompanhamento e a análise de desempenho de vendas.`}
                buttonIcon={<MdAttachMoney size={24} />}
                buttonLabel="Nova Venda"
                onClick={handlePushNewSale}>
                <div className="sale__filters">
                    <div className='sale__filters__filter'>
                        <div>
                            <TextField
                                name="numberSale"
                                placeholder="ex: 501"
                                value={numberSale}
                                onChange={(ev) => setNumberSale(ev.target.value)}
                                label="N° O.S."
                                id="numberSale"
                                required={true}
                            />
                        </div>
                        <div>
                            <TextField
                                name="name"
                                placeholder="ex: Josão"
                                value={name}
                                onChange={(ev) => setName(ev.target.value)}
                                label="RUA"
                                id="name"
                                required={true}
                            />
                        </div>
                    </div>
                    <div>
                        <ButtonsTertiary>
                            Buscar
                            <MdSearch size={24} />
                        </ButtonsTertiary>
                    </div>
                </div>
            </Hero>
            <div className="container-table">
                <div className="container-table__content">
                    <table className="table">
                        <Head columns={columns} isButton={true} />
                        <tbody className="body">
                            {!!data && data.map((item) => (
                                <tr key={item.id} className='body__row'>
                                    <RowItem label={(item.id).toString()} isActive={null} />
                                    <RowItem label={item.Data} isActive={null} />
                                    <RowItem label={item.Hora} isActive={null} />
                                    <RowItem label={item.Nome} isActive={null} />
                                    <td className={'row buttons'}>
                                        <div>
                                            <ButtonsEdit href={`/ordem-servico/editar?id=${item.id}`}>
                                                <MdOutlineEdit size={24} />
                                            </ButtonsEdit>
                                        </div>
                                        <div>
                                            <ButtonsDelete href={`/ordem-servico/deletar?id=${item.id}`}>
                                                <MdDelete size={24} />
                                            </ButtonsDelete>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </LayoutDefault>
    );
}