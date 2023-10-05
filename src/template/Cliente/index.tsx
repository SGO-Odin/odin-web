import './clientTemplate.scss'
import { ButtonsTertiary } from "@/src/components/buttons/tertiary";
import { Hero } from "@/src/components/hero";
import LayoutDefault from "@/src/components/layoutDefault";
import { Search } from "@/src/components/search";
import { TablesCustom } from "@/src/components/tablesCustom";
import { useRouter } from "next/navigation";
import { MdPerson, MdSearch } from "react-icons/md";

const data = [
    { Id: 1, Nome: "João", Telefone: "(73) 9 0000 - 0000", Whatsapp: "(73) 9 1234 - 4568" },
    { Id: 2, Nome: "Maria", Telefone: "(73) 9 0000 - 0000", Whatsapp: "(73) 9 1234 - 4568" },
];

const columns = ["Id", "Nome", "Telefone", "Whatsapp"];

export const ClientTemplate = () => {
    const { push } = useRouter();

    const handlePushNewClient = () => {
        push("/cliente/cadastrar");
    };

    return (
        <LayoutDefault>
            <Hero
                isButtonPrymary={true}
                title="Consultar Cliente"
                paragraph={`Encontre e acesse informações dos clientes cadastrados, facilitando o atendimento e a gestão de relacionamentos.`}
                buttonIcon={<MdPerson size={24} />}
                buttonLabel="Cadastrar Cliente"
                onClick={handlePushNewClient}>
                <div className="client__filters">
                    <div>
                        <Search placeholder="ex: João" />
                    </div>
                    <div>
                        <ButtonsTertiary>
                            Buscar
                            <MdSearch size={24} />
                        </ButtonsTertiary>
                    </div>
                </div>
            </Hero>
            <div className="client">
                <TablesCustom data={data} columns={columns} isButton={true} typeButton={"two"} />
            </div>
        </LayoutDefault>
    );
}
