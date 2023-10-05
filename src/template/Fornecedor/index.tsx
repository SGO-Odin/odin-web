import LayoutDefault from "@/src/components/layoutDefault";
import "./supplierTemplete.scss";
import { ButtonsPrimary } from "@/src/components/buttons/primary";
import { BsEmojiSunglassesFill } from "react-icons/bs";
import { Search } from "@/src/components/search";
import { ButtonsEdit } from "@/src/components/buttons/edit";
import { MdDelete, MdLocalShipping, MdOutlineEdit, MdSearch } from "react-icons/md";
import { ButtonsDelete } from "@/src/components/buttons/delete";
import { useRouter } from "next/navigation";
import { TablesCustom } from "@/src/components/tablesCustom";
import { Hero } from "@/src/components/hero";
import { ButtonsTertiary } from "@/src/components/buttons/tertiary";

const data = [
  { Id: 1, Fornecedor: "Laboratorio X", Nome: "João" },
  { Id: 2, Fornecedor: "Laboratorio W", Nome: "Maria" },
];

const columns = ["Fornecedor", "Nome"];

export function SupplierTemplete() {
  const { push } = useRouter();

  const handlePushNewSupplier = () => {
    push("/fornecedor/cadastrar");
  };

  return (
    <LayoutDefault>
      <Hero
        isButtonPrymary={true}
        title="Consultar Fornecedor"
        paragraph={`Nossa página de consulta de fornecedores simplifica a busca de informações vitais. Encontre seus fornecedores confiáveis em um só lugar!`}
        buttonIcon={<MdLocalShipping size={24} />}
        buttonLabel="Cadastrar Fornecedor"
        onClick={handlePushNewSupplier}>
        <div className="supplier__filters">
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
      <div className="supplier">
        <TablesCustom data={data} columns={columns} isButton={true} typeButton={"two"} />
      </div>
    </LayoutDefault>
  );
}
