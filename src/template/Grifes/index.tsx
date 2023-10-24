import LayoutDefault from "@/src/components/layoutDefault"
import "./brands.scss"
import { BsEmojiSunglassesFill } from "react-icons/bs"
import { Search } from "@/src/components/search"
import { useRouter } from "next/navigation"
import { Hero } from "@/src/components/hero"
import { ButtonsTertiary } from "@/src/components/buttons/tertiary"
import { MdDelete, MdOutlineEdit, MdSearch } from "react-icons/md"
import { IBrands } from "@/src/interface/datas"
import Head from "@/src/components/table/head"
import RowItem from "@/src/components/table/body/rowItem"
import axios from "axios"
import { useEffect, useState } from "react"
import { ButtonsEdit } from "@/src/components/buttons/edit"
import { ButtonsDelete } from "@/src/components/buttons/delete"

const columns = ["Nome", "Status"]

export function BrandsTemplate() {
  const { push } = useRouter()

  const [brands, setBrands] = useState<IBrands[]>([])

  useEffect(() => {
    axios.get('/api/brands').then(response => {
      setBrands(response.data)
    })
  }, [])

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
      <div className="container-table">
        <div className="container-table__content">
          <table className="table">
            <Head columns={columns} isButton={true} />
            <tbody className="body">
              {brands.map((item) => (
                <tr key={item._id} className='body__row'>
                  <RowItem label={item.brands} isActive={null} />
                  <RowItem label={item.isActive ? 'Ativo' : 'Inativo'} isActive={item.isActive} />
                  <td className={'row buttons'}>
                    <div>
                      <ButtonsEdit href={`/grifes/editar?id=${item._id}`}>
                        <MdOutlineEdit size={24} />
                      </ButtonsEdit>
                    </div>
                    <div>
                      <ButtonsDelete href={`/grifes/deletar?id=${item._id}`}>
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