import { ButtonsTertiary } from "@/src/components/buttons/tertiary";
import { Hero } from "@/src/components/hero";
import LayoutDefault from "@/src/components/layoutDefault";
import { TablesCustom } from "@/src/components/tablesCustom";
import { TextField } from "@/src/components/textField";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdAttachMoney, MdSearch } from "react-icons/md";
import './sale.scss'

const data = [
    { "ID": 1, Data: "01 / 11 / 2022", Hora: "11:25", Nome: "Adailton" },
    { "ID": 2, Data: "01 / 11 / 2022", Hora: "11:25", Nome: "Adailton" },
];

const columns = ["ID", "Data", "Hora", "Nome"];

export default function SaleTemplate() {
    const { push } = useRouter();

    const [numberSale, setNumberSale] = useState<string>("")
    const [name, setName] = useState<string>("")

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
            <div className="sale">
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