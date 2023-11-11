import LayoutDefault from "@/src/components/layoutDefault";
import { Search } from "@/src/components/search";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdDelete, MdOutlineEdit, MdSearch } from "react-icons/md";
import "./productTemplate.scss"
import { ButtonsTertiary } from "@/src/components/buttons/tertiary";
import { Hero } from "@/src/components/hero";
import { BsEyeglasses } from "react-icons/bs";
import Head from "@/src/components/table/head";
import RowItem from "@/src/components/table/body/rowItem";
// import { ButtonsEdit } from "@/src/components/buttons/edit";
import { ButtonsDelete } from "@/src/components/buttons/delete";
import axios from "axios";
import { handleFormatNumber } from "@/src/hook/format-number";
import { IBrands } from "@/src/server/entities/brand";
import { IProduct } from "@/src/server/entities/product";

const columns = ["Nome", "Marca", "Referencia", "Valor", "Qtd"];

export default function ProductTemplate() {
  const { push } = useRouter();

  const [product, setProduct] = useState<IProduct[]>([])
  const [listBrands, setListBrands] = useState<IBrands[]>([])

  useEffect(() => {
    axios.get('/api/brands')
      .then(response => {
        if (response.status == 200) {
          setListBrands(response.data.response)
        }
      })
      .catch((error) => {
        console.log(error.response.data)
      })

    axios.get('/api/product')
      .then(response => {
        if (response.status == 200) {
          setProduct(response.data.response)
        }
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }, [])

  const handlePushNameBrand = (id: number) => {
    const filterBrands = listBrands.find((item) => item.id === id ? item.name : null)
    if (filterBrands) {
      return filterBrands.name
    }
    return null
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
              {!!product && product.map((item) => (
                <tr key={item.id} className='body__row'>
                  <RowItem label={item.name} isActive={null} />
                  <RowItem label={`${handlePushNameBrand(item.brands)}`} isActive={null} />
                  <RowItem label={item.reference} isActive={null} />
                  <RowItem label={`R$ ${handleFormatNumber((item.currentSalePrice).toString())}`} isActive={null} />
                  <RowItem label={item.active ? 'Ativo' : 'Inativo'} isActive={item.active} />
                  <td className={'row buttons'}>
                    {/* <div>
                      <ButtonsEdit href={`/produtos/editar?id=${item.id}`}>
                        <MdOutlineEdit size={24} />
                      </ButtonsEdit>
                    </div> */}
                    <div>
                      <ButtonsDelete href={`/produtos/deletar?id=${item.id}`}>
                        Excluir
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
