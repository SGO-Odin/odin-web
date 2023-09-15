import { ButtonsPrimary } from "@/src/components/buttons/primary";
import LayoutDefault from "@/src/components/layoutDefault";
import { Search } from "@/src/components/search";
import { TablesCustom } from "@/src/components/tablesCustom";
import { useRouter } from "next/navigation";
import React from "react";
import { MdLocalShipping } from "react-icons/md";
import "./productTemplate.scss"

const data = [
  { Id: 1, Nome: "Laboratorio X", Marca: "João", Referencia: "Laboratorio X", Valor: "João", Qtd: "João" },
  { Id: 2, Nome: "Laboratorio W", Marca: "Maria", Referencia: "Laboratorio X", Valor: "João", Qtd: "João" },
];

const columns = ["Nome", "Marca", "Referencia", "Valor", "Qtd"];

export default function ProductTemplate() {
  const { push } = useRouter();

  const handlePushNewProduct = () => {
    push("/produto/cadastrar");
  };
  
  return (
    <LayoutDefault>
      <div className="product">
        <div className="product__hero">
          <div>
            <ButtonsPrimary onClick={() => handlePushNewProduct()}>
              <MdLocalShipping size={24} />
              Cadastrar Fornecedor
            </ButtonsPrimary>
          </div>
          <div>
            <Search />
          </div>
        </div>
        <hr className="menu__mobile__line" />
        <p className="product__paragraph">
          Fornecedor desativado não podera ser mais usado no cadastro de
          produto. <br />
          Você também pode editar ou excluir um Fornecedor usando os botões
          abaixo.
        </p>
        <div className="product__content">
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
