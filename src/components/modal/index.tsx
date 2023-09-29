import './modal.scss'
import { MdOutlineClose } from "react-icons/md"
import { Dispatch, SetStateAction } from "react"

interface IModal {
    isOpenModal?: boolean
    setIsOpenModal?: Dispatch<SetStateAction<boolean>>
    title?: string
    paragraph?: string
    children: React.ReactNode
}

export const Modal = ({ isOpenModal, setIsOpenModal, title, paragraph, children }: IModal) => {
    if (isOpenModal) {
        return (
            <section className="modal">
                <div className="modal__box">
                    <header className="modal__box__header">
                        <div className="modal__box__header__content">
                            <h5 className="title">{title}</h5>
                            <button className='button' onClick={() => setIsOpenModal(!isOpenModal)}>
                                <MdOutlineClose size={24} />
                            </button>
                        </div>
                        <hr className="modal__box__header__line" />
                    </header>
                    <div className="modal__box__content">
                        <p className="paragraph">{paragraph}</p>
                        <div className="buttons">
                            {children}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
    return null
}