import LayoutDefault from '@/src/components/layoutDefault';
import './serviceOrderTemplate.scss'
import { Hero } from '@/src/components/hero';
import { ButtonsTertiary } from '@/src/components/buttons/tertiary';
import { MdAttachMoney, MdBuild, MdCancel, MdDelete, MdOutlineEdit, MdSearch } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { TextField } from '@/src/components/textField';
import { useEffect, useState } from 'react';
import Card from '@/src/components/commons/card';
import axios from 'axios';
import { handleFormatNumber } from '@/src/hook/format-number';
import Head from '@/src/components/table/head';
import RowItem from '@/src/components/table/body/rowItem';
import { ButtonsEdit } from '@/src/components/buttons/edit';
import { ButtonsDelete } from '@/src/components/buttons/delete';
import { ICreateServiceOrderRes, IServiceOrder } from '@/src/server/entities/service-order';
import { IClient } from '@/src/server/entities/client';
import { handleFormatDateBR } from '@/src/hook/format-date-br';
import { parseCookies } from 'nookies';

const columns = ["N° OS", "Data", "Hora", "Nome"];

export default function ServiceOrderTemplate() {
    const { push } = useRouter();

    const [numberOS, setNumberOS] = useState<string>("")
    const [name, setName] = useState<string>("")

    const [openServiceOrder, setOpenServiceOrder] = useState<number>(0)
    const [quantityServiceOrder, setQuantityServiceOrder] = useState<number>(0)
    const [totalServiceOrder, setTotalServiceOrder] = useState<number>(0)
    const [orderService, setOrderService] = useState<ICreateServiceOrderRes[]>([])

    const [client, setClient] = useState<IClient[]>([])

    const { 'odinauth.token': token } = parseCookies()
    const _header = { headers: { "Authorization": `Bearer ${token}` } }

    useEffect(() => {
        axios.get('/api/service-order', _header)
            .then(response => {

                console.log(response.data.response)
                const jokerCounter = response.data.response.reduce((counter, objeto) => {
                    if (objeto.status === 'OPENED') {
                        return counter + 1
                    }
                    return counter
                }, 0)

                const jokerTotalSale = response.data.response.reduce((totalSale, objeto) => {

                    return totalSale + objeto.amountTotal
                }, 0)

                setOrderService(response.data.response)
                setQuantityServiceOrder(response.data.response.length)
                setOpenServiceOrder(jokerCounter)
                setTotalServiceOrder(jokerTotalSale)
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

    const handlePushClient = (id: number): string => {
        const name: IClient = client.find((item) => item.id === id ? item : null)
        return name ? `${name.firstName} ${name.lastName}` : null
    }

    const handlePushNewServiceOrder = () => {
        push("/ordem-servico/cadastrar");
    };

    return (
        <LayoutDefault>
            <Hero
                isButtonPrymary={true}
                title="Consultar OS"
                paragraph={`Visualize e gerencie todas as ordens em andamento, garantindo um controle eficiente das atividades.`}
                buttonIcon={<MdBuild size={24} />}
                buttonLabel="Cadastrar OS"
                onClick={handlePushNewServiceOrder}>
                <div className="service-order__filters">
                    <div className='service-order__filters__filter'>
                        <div>
                            <TextField
                                name="numberOS"
                                placeholder="ex: 501"
                                value={numberOS}
                                onChange={(ev) => setNumberOS(ev.target.value)}
                                label="N° O.S."
                                id="numberOS"
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
            <div className="service-order__cards">
                <Card
                    paragraph='O.S. em Aberto'
                    title={`${openServiceOrder}`}>
                    <MdBuild size={64} />
                </Card>
                <Card
                    paragraph='Total de O.S.'
                    title={quantityServiceOrder.toString()}>
                    <MdBuild size={64} />
                </Card>
                <Card
                    paragraph='Valor Total (R$)'
                    title={handleFormatNumber(totalServiceOrder.toString())}>
                    <MdAttachMoney size={64} />
                </Card>
            </div>
            <div className="container-table">
                <div className="container-table__content">
                    <table className="table">
                        <Head columns={columns} isButton={true} />
                        <tbody className="body">
                            {!!orderService && orderService.map((item) => (
                                <tr key={item.id} className='body__row'>
                                    <RowItem label={(item.id).toString()} isActive={null} />
                                    <RowItem label={handleFormatDateBR(item.createdOn, 'DATE')} isActive={null} />
                                    <RowItem label={handleFormatDateBR(item.createdOn, 'HOUR')} isActive={null} />
                                    <RowItem label={handlePushClient(item.client)} isActive={null} />
                                    <td className={'row buttons'}>
                                        {/* <div>
                                            <ButtonsEdit href={`/ordem-servico/editar?id=${item.id}`}>
                                                <MdOutlineEdit size={24} />
                                            </ButtonsEdit>
                                        </div> */}
                                        <div>
                                            <ButtonsDelete href={`/ordem-servico/deletar?id=${item.id}`}>
                                                Cancelar
                                                <MdCancel size={24} />
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
