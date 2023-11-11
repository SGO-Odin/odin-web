import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Modal } from "@/src/components/modal";
import { ButtonsTertiary } from "@/src/components/buttons/tertiary";
import { ButtonsPrimary } from "@/src/components/buttons/primary";

export default function DeleteSupplierPage() {

    const [tradingName, setTradingName] = useState<string>("")

    const [isOpen, setIsOpen] = useState<boolean>(true)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (id) {
            axios.get('/api/purveyor?id=' + id)
                .then(response => {
                    setTradingName(response.data.response.tradingName)
                })
                .catch((error) => {
                    console.log(error.response.data)
                })
        }
    }, [id])

    const handleDeleteSupplier = async () => {
        console.log("AQUI")
        // delete
        axios.delete('/api/purveyor?id=' + id)
            .then(response => {
                // GoBack()
                if (response.status == 201) goBack()
            })
            .catch((error) => {
                console.log(error.response.data)
            })
    }

    const goBack = () => {
        router.push('/fornecedor')
    }

    if (isOpen) {
        return (
            <Modal
                title={`Deseja deletar o fornecedor ${tradingName}?`}
                paragraph={`Atenção! A ação de "Deletar o Fornecedor ${tradingName}" é irreversível. Ao confirmar, a marca será removida permanentemente. Certifique-se da ação antes de prosseguir.`}
                isOpenModal={isOpen}
                setIsOpenModal={setIsOpen}>
                <ButtonsTertiary onClick={goBack}>Cancelar</ButtonsTertiary>
                <ButtonsPrimary onClick={handleDeleteSupplier}>Deletar {tradingName}</ButtonsPrimary>
            </Modal>
        );
    } else {
        goBack()
    }
}