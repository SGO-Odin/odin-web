import LayoutDefault from "@/src/components/layoutDefault"
import "./brands.scss"
import { BsEmojiSunglassesFill } from "react-icons/bs"
import { Search } from "@/src/components/search"
import { useRouter } from "next/navigation"
import { Hero } from "@/src/components/hero"
import { ButtonsTertiary } from "@/src/components/buttons/tertiary"
import { MdDelete, MdOutlineEdit, MdSearch } from "react-icons/md"
import Head from "@/src/components/table/head"
import RowItem from "@/src/components/table/body/rowItem"
import axios from "axios"
import { useEffect, useState } from "react"
import { ButtonsDelete } from "@/src/components/buttons/delete"
import { IBrands } from "@/src/server/entities/brand"
import { Toggle } from "@/src/components/toggle"
import { ButtonsEdit } from "@/src/components/buttons/edit"
import axiosFrontend from "http"
import { parseCookies } from "nookies"

const columns = ["Nome", "Ativo"]

export function BrandsTemplate() {
  const router = useRouter()

  const [brands, setBrands] = useState<IBrands[]>([])

  const datateste = async () => {

    // console.log(response)
  }

  useEffect(() => {
    datateste()
    const { 'odinauth.token': token } = parseCookies()

    axios.get('/api/brands', { headers: { "Authorization": `Bearer ${token}` } })
      .then(response => {
        if (response.status == 200) {
          setBrands(response.data.response)
        }
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }, [])

  const handlePushNewBrands = () => {
    router.push("/grifes/cadastrar");
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

      <div className="container-table">
        <div className="container-table__content">
          <table className="table">
            <Head columns={columns} isButton={true} />
            <tbody className="body">
              {!!brands && brands.map((item) => item.isActive !== false ? (
                <tr key={item.id} className='body__row'>
                  <RowItem label={item.name} isActive={null} />
                  <RowItem label={`${item.isActive ? 'ATIVO' : 'INATIVO'}`} isActive={item.isActive} />
                  <td className={'row buttons'}>
                    <div>
                      <ButtonsEdit href={`/grifes/editar?id=${item.id}`}>
                        Editar
                        <MdOutlineEdit size={24} />
                      </ButtonsEdit>
                    </div>
                    <div>
                      <ButtonsDelete href={`/grifes/deletar?id=${item.id}`}>
                        Excluir
                        <MdDelete size={24} />
                      </ButtonsDelete>
                    </div>
                  </td>
                </tr>
              ) : null)}
            </tbody>
          </table>
        </div>
      </div>
    </LayoutDefault>
  );
}