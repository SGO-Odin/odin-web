import LayoutDefault from "@/src/components/layoutDefault";
import "./supplierTemplete.scss";
import { Search } from "@/src/components/search";
import { ButtonsEdit } from "@/src/components/buttons/edit";
import { MdDelete, MdLocalShipping, MdOutlineEdit, MdSearch } from "react-icons/md";
import { ButtonsDelete } from "@/src/components/buttons/delete";
import { useRouter } from "next/navigation";
import { Hero } from "@/src/components/hero";
import { ButtonsTertiary } from "@/src/components/buttons/tertiary";
import RowItem from "@/src/components/table/body/rowItem";
import Head from "@/src/components/table/head";
import { useEffect, useState } from "react";
import axios from "axios";
import { ISupplier } from "@/src/interface/datas";


const columns = ["Fornecedor", "Razão Social", "Laboratório"];

export function SupplierTemplete() {
  const { push } = useRouter();

  const [suppiler, setSuppiler] = useState<ISupplier[]>([])

  useEffect(() => {
    axios.get('/api/supplier').then(response => {
      setSuppiler(response.data)
    })
  }, [])

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
      <div className="container-table">
        <div className="container-table__content">
          <table className="table">
            <Head columns={columns} isButton={true} />
            <tbody className="body">
              {!!suppiler && suppiler.map((item) => (
                <tr key={item._id} className='body__row'>
                  <RowItem label={item.tradingName} isActive={null} />
                  <RowItem label={item.companyName} isActive={null} />
                  <RowItem label={item.isLaboratory ? 'Sim' : 'Não'} isActive={item.isLaboratory} />
                  <td className={'row buttons'}>
                    <div>
                      <ButtonsEdit href={`/fornecedor/editar?id=${item._id}`}>
                        <MdOutlineEdit size={24} />
                      </ButtonsEdit>
                    </div>
                    <div>
                      <ButtonsDelete href={`/fornecedor/deletar?id=${item._id}`}>
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
