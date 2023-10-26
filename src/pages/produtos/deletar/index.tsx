import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Modal } from "@/src/components/modal";
import { ButtonsTertiary } from "@/src/components/buttons/tertiary";
import { ButtonsPrimary } from "@/src/components/buttons/primary";

export default function DeleteBrandPage() {

    const [nameProduct, setNameProduct] = useState<string>("")

    const [isOpen, setIsOpen] = useState<boolean>(true)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (!id) { return }
        axios.get('/api/product?id=' + id)
            .then(response => {
                setNameProduct(response.data.nameProduct)
            })
    }, [id])

    const handleDeleteBrand = async () => {

        // delete
        await axios.delete('/api/product?id=' + id)

        goBack()
    }

    const goBack = () => {
        router.push('/produtos')
    }

    if (isOpen) {
        return (
            <Modal
                title={`Deseja deletar o produto ${nameProduct}?`}
                paragraph={`Atenção! A ação de "Deletar o Produto ${nameProduct}" é irreversível. Ao confirmar, a marca será removida permanentemente. Certifique-se da ação antes de prosseguir.`}
                isOpenModal={isOpen}
                setIsOpenModal={setIsOpen}>
                <ButtonsTertiary onClick={goBack}>Cancelar</ButtonsTertiary>
                <ButtonsPrimary onClick={handleDeleteBrand}>Deletar {nameProduct}</ButtonsPrimary>
            </Modal>
        );
    } else {
        goBack()
    }
}