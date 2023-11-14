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
import { parseCookies } from "nookies";
import { ISale } from "@/src/server/entities/sale";
import { IClient } from "@/src/server/entities/client";

const columns = ["ID", "Nome", "CPF", "Email"];

export default function SaleTemplate() {
    const { push } = useRouter();

    const [numberSale, setNumberSale] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [sale, setSale] = useState<ISale[]>()
    const [client, setClient] = useState<IClient[]>([])

    const { 'odinauth.token': token } = parseCookies()
    const _header = { headers: { "Authorization": `Bearer ${token}` } }

    useEffect(() => {
        axios.get('/api/sale', _header)
            .then(response => {
                console.log(response)
                setSale(response.data.response)
            })
            .catch((error) => {
                console.log(error.response.data)
            })

        axios.get('/api/client', _header)
            .then(response => {
                setClient(response.data.response)
            })
            .catch((error) => {
                console.log(error.response.data)
            })
    }, [])

    const maskCPF = (cpf: string): string => {
        cpf = cpf.replace(/\D/g, '');

        if (cpf.length < 7) {
            throw new Error('CPF inválido.');
        }

        const cpfMascarado = cpf.replace(/^(\d{7})/, (_, grupo1) => '*'.repeat(grupo1.length));

        return `${cpfMascarado.slice(0, 3)}.${cpfMascarado.slice(3, 6)}.${cpfMascarado.slice(6, 9)}-${cpfMascarado.slice(9)}`;
    }

    const handleSetNameClient = (id: number): string => {
        console.log("ID")
        console.log(id)

        const item: IClient = client.find((item) => item.id == id ? item : null)
        if (item) {
            return `${item.firstName} ${item.lastName}`
        }
        return null
    }

    const handleSetCpfClient = (id: number): string => {
        const item: IClient = client.find((item) => item.id == id.id ? item : null)
        if (item) {
            return maskCPF(item.cpf)
        }
        return null
    }

    const handleSetEmailClient = (id: number): string => {
        const item: IClient = client.find((item) => item.id == id ? item : null)
        if (item) {
            return item.emails[0]
        }
        return null
    }

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
                            {!!sale && sale.map((item) => (
                                <tr key={item.id} className='body__row'>
                                    <RowItem label={(item.id).toString()} isActive={null} />
                                    <RowItem label={`${item.clientId.firstName} ${item.clientId.lastName}`} isActive={null} />
                                    <RowItem label={maskCPF(item.clientId.cpf)} isActive={null} />
                                    <RowItem label={item.clientId.emails[0]} isActive={null} />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </LayoutDefault>
    );
}