import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Modal } from "@/src/components/modal";
import { ButtonsTertiary } from "@/src/components/buttons/tertiary";
import { ButtonsPrimary } from "@/src/components/buttons/primary";

export default function DeleteBrandPage() {

    const [brands, setBrands] = useState<string>("")

    const [isOpen, setIsOpen] = useState<boolean>(true)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (!id) { return }
        axios.get('/api/brands?id=' + id)
            .then(response => {
                setBrands(response.data.brands)
            })
    }, [id])

    const handleDeleteBrand = async () => {

        // delete
        await axios.delete('/api/brands?id=' + id)

        goBack()
    }

    const goBack = () => {
        router.push('/grifes')
    }

    if (isOpen) {
        return (
            <Modal
                title={`Deseja realmente deletar a marca ${brands}?`}
                paragraph={`Atenção! A ação de "Deletar a Marca ${brands}" é irreversível. Ao confirmar, a marca será removida permanentemente. Certifique-se da ação antes de prosseguir.`}
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