import LayoutDefault from '@/src/components/layoutDefault';
import './serviceOrderTemplate.scss'
import { Hero } from '@/src/components/hero';
import { ButtonsTertiary } from '@/src/components/buttons/tertiary';
import { MdAttachMoney, MdBuild, MdSearch } from 'react-icons/md';
import { TablesCustom } from '@/src/components/tablesCustom';
import { useRouter } from 'next/navigation';
import { TextField } from '@/src/components/textField';
import { useState } from 'react';
import Card from '@/src/components/commons/card';

const data = [
    { "N° OS": 1, Data: "01 / 11 / 2022", Hora: "11:25", Nome: "Adailton" },
    { "N° OS": 2, Data: "01 / 11 / 2022", Hora: "11:25", Nome: "Adailton" },
];

const columns = ["N° OS", "Data", "Hora", "Nome"];

export default function ServiceOrderTemplate() {
    const { push } = useRouter();

    const [numberOS, setNumberOS] = useState<string>("")
    const [name, setName] = useState<string>("")

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
                    title={`${data.length}`}>
                    <MdBuild size={64} />
                </Card>
                <Card
                    paragraph='Total de O.S.'
                    title='500'>
                    <MdBuild size={64} />
                </Card>
                <Card
                    paragraph='Valor Total (R$)'
                    title='5.000,00'>
                    <MdAttachMoney size={64} />
                </Card>
            </div>
            <div className="service-order">
                <TablesCustom
                    data={data}
                    columns={columns}
                    isButton={true}
                    typeButton={"two"}
                />
            </div>
        </LayoutDefault>
    );
}
