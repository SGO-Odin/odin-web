import LayoutDefault from "@/src/components/layoutDefault";
import "./brands.scss";
import { ButtonsPrimary } from "@/src/components/buttons/primary";
import { BsEmojiSunglassesFill } from "react-icons/bs";
import { Search } from "@/src/components/search";
import { useRouter } from "next/navigation";
import { TablesCustom } from "@/src/components/tablesCustom";
import { Hero } from "@/src/components/hero";
import { ButtonsTertiary } from "@/src/components/buttons/tertiary";
import { MdSearch } from "react-icons/md";

const data = [
  {
    Id: 1,
    Nome: "Laboratorio X",
    "Qtd Produtos": "João",
    Status: "Laboratorio X",
  },
  {
    Id: 2,
    Nome: "Laboratorio W",
    "Qtd Produtos": "Maria",
    Status: "Laboratorio X",
  },
];

const columns = ["Nome", "Qtd Produtos", "Status", "Valor", "Qtd"];

export function BrandsTemplate() {
  const { push } = useRouter();

  const handlePushNewBrands = () => {
    push("/grifes/cadastrar");
  };

  return (
    <LayoutDefault>
      <Hero isButtonPrymary={true} title="Consultar Grifes" paragraph={`Esta página de foi criada para facilitar o acesso às informações sobre grifes disponíveis. Encontre rapidamente o que você precisa aqui!.`} buttonIcon={<BsEmojiSunglassesFill size={24} />} buttonLabel="Cadastrar Grifes" onClick={handlePushNewBrands}>
        <div className="brands__filters">
          <div>
            <Search placeholder="ex: Diesel" />
          </div>
          <div>
            <ButtonsTertiary>
              Buscar
              <MdSearch size={24} />
            </ButtonsTertiary>
          </div>
        </div>
      </Hero>
      <div className="brands">
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
