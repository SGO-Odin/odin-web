import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Modal } from "@/src/components/modal";
import { ButtonsTertiary } from "@/src/components/buttons/tertiary";
import { ButtonsPrimary } from "@/src/components/buttons/primary";
import { IClient, IOrderService } from "@/src/interface/datas";

export default function DeleteBrandPage() {

    const [brands, setBrands] = useState<string>("")

    const [isOpen, setIsOpen] = useState<boolean>(true)
    const router = useRouter()
    const { id } = router.query

    const [numberOS, setNumberOS] = useState<string>('')
    const [name, setName] = useState<string>('')

    useEffect(() => {
        axios.get('/api/service-order?id=' + id).then(response => {
            setNumberOS(response.data.number)

            axios.get('/api/client?id=' + response.data.client).then(response => {
                setName(response.data.firsName)
            })
        })

    }, [])

    const handleDeleteBrand = async () => {

        // delete
        await axios.delete('/api/service-order?id=' + id)

        goBack()
    }

    const goBack = () => {
        router.push('/ordem-servico')
    }

    if (isOpen) {
        return (
            <Modal
                title={`Deseja realmente deletar essa O.S?`}
                paragraph={`Atenção! A ação de "Deletar a O.S ${numberOS} de ${name}" é irreversível. Ao confirmar, a marca será removida permanentemente. Certifique-se da ação antes de prosseguir.`}
                isOpenModal={isOpen}
                setIsOpenModal={setIsOpen}>
                <ButtonsTertiary onClick={goBack}>Cancelar</ButtonsTertiary>
                <ButtonsPrimary onClick={handleDeleteBrand}>Deletar {brands}</ButtonsPrimary>
            </Modal>
        );
    } else {
        goBack()
    }
}