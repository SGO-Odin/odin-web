import LayoutDefault from "@/src/components/layoutDefault";
import "./brands.scss";
import { ButtonsPrimary } from "@/src/components/buttons/primary";
import { BsEmojiSunglassesFill } from "react-icons/bs";
import { Search } from "@/src/components/search";
import { useRouter } from "next/navigation";
import { TablesCustom } from "@/src/components/tablesCustom";

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
      <div className="brands">
        <div className="brands__hero">
          <div>
            <ButtonsPrimary onClick={() => handlePushNewBrands()}>
              <BsEmojiSunglassesFill size={24} />
              Cadastrar Grifes
            </ButtonsPrimary>
          </div>
          <div>
            <Search />
          </div>
        </div>
        <hr className="menu__mobile__line" />
        <p className="brands__paragraph">
          Grifes desativadas não poderão ser mais usadas no cadastro de produto.{" "}
          <br />
          Você também pode editar ou excluir uma Grife usando os botões abaixo.
        </p>
        <div className="brands__content">
          <TablesCustom
            data={data}
            columns={columns}
            isButton={true}
            typeButton={"two"}
          />
        </div>
      </div>
    </LayoutDefault>
  );
}
