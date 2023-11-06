import LayoutDefault from "@/src/components/layoutDefault";
import { Search } from "@/src/components/search";
import { TablesCustom } from "@/src/components/tablesCustom";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdDelete, MdOutlineEdit, MdSearch } from "react-icons/md";
import "./productTemplate.scss"
import { ButtonsTertiary } from "@/src/components/buttons/tertiary";
import { Hero } from "@/src/components/hero";
import { BsEyeglasses } from "react-icons/bs";
import Head from "@/src/components/table/head";
import RowItem from "@/src/components/table/body/rowItem";
import { ButtonsEdit } from "@/src/components/buttons/edit";
import { ButtonsDelete } from "@/src/components/buttons/delete";
import { IBrands, IProduct } from "@/src/interface/datas";
import axios from "axios";
import { handleFormatNumber } from "@/src/hook/format-number";

const data = [
  { Id: 1, Nome: "Laboratorio X", Marca: "João", Referencia: "Laboratorio X", Valor: "João", Qtd: "João" },
  { Id: 2, Nome: "Laboratorio W", Marca: "Maria", Referencia: "Laboratorio X", Valor: "João", Qtd: "João" },
];

const columns = ["Nome", "Marca", "Referencia", "Valor", "Qtd"];

export default function ProductTemplate() {
  const { push } = useRouter();

  const [product, setProduct] = useState<IProduct[]>([])
  const [listBrands, setListBrands] = useState<IBrands[]>([])

  useEffect(() => {
    axios.get('/api/brands').then(response => {
      setListBrands(response.data)
    })

    axios.get('/api/product').then(response => {
      setProduct(response.data)
    })
  }, [])

  const handlePushNameBrand = (id: number) => {
    return (listBrands.filter((item) => item._id === id ? item.brands : null))[0]['brands']
  }

  const handlePushNewProduct = () => {
    push("/produtos/cadastrar");
  };

  return (
    <LayoutDefault>
      <Hero
        isButtonPrymary={true}
        title="Cadastrar Produtos"
        paragraph={`A página de consulta de produtos permite buscar e visualizar informações detalhadas sobre os produtos disponíveis em nosso estoque. Encontre facilmente o que precisa.`}
        buttonIcon={<BsEyeglasses size={24} />}
        buttonLabel="Cadastrar Produto"
        onClick={handlePushNewProduct}>
        <div className="product__filters">
          <div>
            <Search placeholder="ex: Ray Ban" />
          </div>
          <div>
            <ButtonsTertiary>
              Buscar
              <MdSearch size={24} />
            </ButtonsTertiary>
          </div>
        </div>
      </Hero>
      <div className="container-table">
        <div className="container-table__content">
          <table className="table">
            <Head columns={columns} isButton={true} />
            <tbody className="body">
              {product.map((item) => (
                <tr key={item._id} className='body__row'>
                  <RowItem label={item.nameProduct} isActive={null} />
                  <RowItem label={handlePushNameBrand(item.brands)} isActive={null} />
                  <RowItem label={item.reference} isActive={null} />
                  <RowItem label={`R$ ${handleFormatNumber(item.selling)}`} isActive={null} />
                  <RowItem label={item.isActive ? 'Ativo' : 'Inativo'} isActive={item.isActive} />
                  <td className={'row buttons'}>
                    <div>
                      <ButtonsEdit href={`/produtos/editar?id=${item._id}`}>
                        <MdOutlineEdit size={24} />
                      </ButtonsEdit>
                    </div>
                    <div>
                      <ButtonsDelete href={`/produtos/deletar?id=${item._id}`}>
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
