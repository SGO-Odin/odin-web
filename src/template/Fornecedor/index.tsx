import LayoutDefault from "@/src/components/layoutDefault";
import "./purveyorTemplete.scss";
import { Search } from "@/src/components/search";
import { ButtonsEdit } from "@/src/components/buttons/edit";
import { MdDelete, MdLocalShipping, MdOutlineEdit, MdSearch } from "react-icons/md";
import { ButtonsDelete } from "@/src/components/buttons/delete";
import { useRouter } from "next/navigation";
import { Hero } from "@/src/components/hero";
import { ButtonsTertiary } from "@/src/components/buttons/tertiary";
import RowItem from "@/src/components/table/body/rowItem";
import Head from "@/src/components/table/head";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import axios from "axios";
import { IPurveyor } from "@/src/server/entities/purveyor";


const columns = ["Fornecedor", "Razão Social", "Laboratório"];


export function PurveyorTemplete() {
  const { push } = useRouter();
  const [purveyor, setpurveyor] = useState<IPurveyor[]>([])

  const { 'odinauth.token': token } = parseCookies()
  const _header = { headers: { "Authorization": `Bearer ${token}` } }

  useEffect(() => {
    axios.get('/api/purveyor', _header)
      .then(response => {
        console.log(response.data.response)
        setpurveyor(response.data.response)
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }, [])


  const handlePushAddPurveyor = () => {
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
        onClick={handlePushAddPurveyor}>
        <div className="purveyor__filters">
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
              {!!purveyor && purveyor.map((item) => (
                <tr key={item.id} className='body__row'>
                  <RowItem label={item.tradingName} isActive={null} />
                  <RowItem label={item.companyName} isActive={null} />
                  <RowItem label={`${item.laboratory ? 'Sim' : 'Não'}`} isActive={item.laboratory} />
                  <td className={'row buttons'}>
                    {/* <div>
                      <ButtonsEdit href={`/fornecedor/editar?id=${item.id}`}>
                        <MdOutlineEdit size={24} />
                      </ButtonsEdit>
                    </div> */}
                    <div>
                      <ButtonsDelete href={`/fornecedor/deletar?id=${item.id}`}>
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
