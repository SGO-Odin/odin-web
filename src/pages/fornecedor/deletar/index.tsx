import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Modal } from "@/src/components/modal";
import { ButtonsTertiary } from "@/src/components/buttons/tertiary";
import { ButtonsPrimary } from "@/src/components/buttons/primary";

export default function DeleteSupplierPage() {

    const [companyName, setCompanyName] = useState<string>("")

    const [isOpen, setIsOpen] = useState<boolean>(true)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (!id) { return }
        axios.get('/api/supplier?id=' + id)
            .then(response => {
                setCompanyName(response.data.companyName)
            })
    }, [id])

    const handleDeleteSupplier = async () => {

        // delete
        await axios.delete('/api/supplier?id=' + id)

        goBack()
    }

    const goBack = () => {
        router.push('/fornecedor')
    }

    if (isOpen) {
        return (
            <Modal
                title={`Deseja deletar o fornecedor ${companyName}?`}
                paragraph={`Atenção! A ação de "Deletar o Fornecedor ${companyName}" é irreversível. Ao confirmar, a marca será removida permanentemente. Certifique-se da ação antes de prosseguir.`}
                isOpenModal={isOpen}
                setIsOpenModal={setIsOpen}>
                <ButtonsTertiary onClick={goBack}>Cancelar</ButtonsTertiary>
                <ButtonsPrimary onClick={handleDeleteSupplier}>Deletar {companyName}</ButtonsPrimary>
            </Modal>
        );
    } else {
        goBack()
    }
}