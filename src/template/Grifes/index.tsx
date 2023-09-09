import LayoutDefault from "@/src/components/layoutDefault";
import "./brands.scss";
import { ButtonsPrimary } from "@/src/components/buttons/primary";
import { BsEmojiSunglassesFill } from "react-icons/bs";
import { Search } from "@/src/components/search";
import { ButtonsEdit } from "@/src/components/buttons/edit";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { ButtonsDelete } from "@/src/components/buttons/delete";
import { useRouter } from "next/navigation";

export function BrandsTemplate() {
  const { push } = useRouter();

  const handlePushNewBrands = () => {
    push('/grifes/cadastrar')
  }
  
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
          Grifes desativadas não poderão ser mais usadas no cadastro de produto. <br />
          Você também pode editar ou excluir uma Grife usando os botões abaixo.
        </p>
        <div className="brands__content">
          <table className="brands__content__table">
            <thead className="brands__content__table__head">
              <tr className="brands__content__table__head__col">
                <th className="brands__content__table__head__col__item">
                  NOME DA GRIFE
                </th>
                <th className="brands__content__table__head__col__item">
                  QTD. PRODUTOS
                </th>
                <th className="brands__content__table__head__col__item">
                  STATUS
                </th>
                <th className="brands__content__table__head__col__item">...</th>
              </tr>
            </thead>

            <tbody className="brands__content__table__body">
              <tr className="brands__content__table__body__row">
                <td className="brands__content__table__body__row__item">
                  DIESEL
                </td>
                <td className="brands__content__table__body__row__item">0</td>
                <td className="brands__content__table__body__row__item active">
                  ATIVO
                </td>
                <td className="brands__content__table__body__row__item buttons">
                  <div>
                    <ButtonsEdit>
                      <MdOutlineEdit size={24} />
                    </ButtonsEdit>
                  </div>
                  <div>
                    <ButtonsDelete>
                      <MdDelete size={24} />
                    </ButtonsDelete>
                  </div>
                </td>
              </tr>
              <tr className="brands__content__table__body__row">
                <td className="brands__content__table__body__row__item">
                  DIESEL
                </td>
                <td className="brands__content__table__body__row__item">0</td>
                <td className="brands__content__table__body__row__item active">
                  ATIVO
                </td>
                <td className="brands__content__table__body__row__item buttons">
                  <div>
                    <ButtonsEdit>
                      <MdOutlineEdit size={24} />
                    </ButtonsEdit>
                  </div>
                  <div>
                    <ButtonsDelete>
                      <MdDelete size={24} />
                    </ButtonsDelete>
                  </div>
                </td>
              </tr>
              <tr className="brands__content__table__body__row">
                <td className="brands__content__table__body__row__item">
                  DIESEL
                </td>
                <td className="brands__content__table__body__row__item">0</td>
                <td className="brands__content__table__body__row__item inactive">
                  INATIVO
                </td>
                <td className="brands__content__table__body__row__item buttons">
                  <div>
                    <ButtonsEdit>
                      <MdOutlineEdit size={24} />
                    </ButtonsEdit>
                  </div>
                  <div>
                    <ButtonsDelete>
                      <MdDelete size={24} />
                    </ButtonsDelete>
                  </div>
                </td>
              </tr>
              <tr className="brands__content__table__body__row">
                <td className="brands__content__table__body__row__item">
                  DIESEL
                </td>
                <td className="brands__content__table__body__row__item">0</td>
                <td className="brands__content__table__body__row__item active">
                  ATIVO
                </td>
                <td className="brands__content__table__body__row__item buttons">
                  <div>
                    <ButtonsEdit>
                      <MdOutlineEdit size={24} />
                    </ButtonsEdit>
                  </div>
                  <div>
                    <ButtonsDelete>
                      <MdDelete size={24} />
                    </ButtonsDelete>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </LayoutDefault>
  );
}
