import LayoutDefault from "@/src/components/layoutDefault";
import "./supplierTemplete.scss";
import { ButtonsPrimary } from "@/src/components/buttons/primary";
import { BsEmojiSunglassesFill } from "react-icons/bs";
import { Search } from "@/src/components/search";
import { ButtonsEdit } from "@/src/components/buttons/edit";
import { MdDelete, MdLocalShipping, MdOutlineEdit } from "react-icons/md";
import { ButtonsDelete } from "@/src/components/buttons/delete";
import { useRouter } from "next/navigation";
import { TablesCustom } from "@/src/components/tablesCustom";

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
      <div className="supplier">
        <div className="supplier__hero">
          <div>
            <ButtonsPrimary onClick={() => handlePushNewSupplier()}>
              <MdLocalShipping size={24} />
              Cadastrar Fornecedor
            </ButtonsPrimary>
          </div>
          <div>
            <Search />
          </div>
        </div>
        <hr className="menu__mobile__line" />
        <p className="supplier__paragraph">
          Fornecedor desativado não podera ser mais usado no cadastro de
          produto. <br />
          Você também pode editar ou excluir um Fornecedor usando os botões
          abaixo.
        </p>
        <div className="supplier__content">
          <TablesCustom data={data} columns={columns} isButton={true} typeButton={"two"} />
        </div>
      </div>
    </LayoutDefault>
  );
}
