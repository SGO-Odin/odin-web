import LayoutDefault from '@/src/components/layoutDefault';
import './serviceOrderTemplate.scss'
import { Hero } from '@/src/components/hero';
import { ButtonsTertiary } from '@/src/components/buttons/tertiary';
import { MdAttachMoney, MdBuild, MdDelete, MdOutlineEdit, MdSearch } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { TextField } from '@/src/components/textField';
import { useEffect, useState } from 'react';
import Card from '@/src/components/commons/card';
import axios from 'axios';
import { IClient, IOrderService } from '@/src/interface/datas';
import { handleFormatNumber } from '@/src/hook/format-number';
import Head from '@/src/components/table/head';
import RowItem from '@/src/components/table/body/rowItem';
import { ButtonsEdit } from '@/src/components/buttons/edit';
import { ButtonsDelete } from '@/src/components/buttons/delete';

const columns = ["N° OS", "Data", "Hora", "Nome"];

export default function ServiceOrderTemplate() {
    const { push } = useRouter();

    const [numberOS, setNumberOS] = useState<string>("")
    const [name, setName] = useState<string>("")

    const [openServiceOrder, setOpenServiceOrder] = useState<number>(0)
    const [quantityServiceOrder, setQuantityServiceOrder] = useState<number>(0)
    const [totalServiceOrder, setTotalServiceOrder] = useState<number>(0)
    const [orderService, setOrderService] = useState<IOrderService[]>([])

    const [client, setClient] = useState<IClient[]>([])

    useEffect(() => {
        axios.get('/api/service-order').then(response => {

            const jokerCounter = response.data.reduce((counter, objeto) => {
                if (objeto.status === 'OPENED') {
                    return counter + 1
                }
                return counter
            }, 0)

            const jokerTotalSale = response.data.reduce((totalSale, objeto) => {

                return totalSale + objeto.products.reduce((counter, item) => {
                    return (Number(item.salesPrice) * Number(item.quantity)) + counter
                }, 0)
            }, 0)

            setOrderService(response.data)
            setQuantityServiceOrder(response.data.length)
            setOpenServiceOrder(jokerCounter)
            setTotalServiceOrder(jokerTotalSale)
        })

        axios.get('/api/client').then(response => {
            setClient(response.data)
        })
    }, [])

    const handlePushClient = (id: number): string => {
        const name: IClient = client.find((item) => item._id === id ? item : null)
        return name ? `${name.firsName} ${name.lastName}` : null
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
                            {orderService.map((item) => (
                                <tr key={item._id} className='body__row'>
                                    <RowItem label={item.number} isActive={null} />
                                    <RowItem label={item.dateRegister} isActive={null} />
                                    <RowItem label={item.hourRegister} isActive={null} />
                                    <RowItem label={handlePushClient(item._id)} isActive={null} />
                                    <td className={'row buttons'}>
                                        <div>
                                            <ButtonsEdit href={`/ordem-servico/editar?id=${item._id}`}>
                                                <MdOutlineEdit size={24} />
                                            </ButtonsEdit>
                                        </div>
                                        <div>
                                            <ButtonsDelete href={`/ordem-servico/deletar?id=${item._id}`}>
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
