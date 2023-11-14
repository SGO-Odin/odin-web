import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Modal } from "@/src/components/modal";
import { ButtonsTertiary } from "@/src/components/buttons/tertiary";
import { ButtonsPrimary } from "@/src/components/buttons/primary";
import { parseCookies } from "nookies";

export default function DeleteSupplierPage() {

    const [tradingName, setTradingName] = useState<string>("")

    const [isOpen, setIsOpen] = useState<boolean>(true)
    const router = useRouter()
    const { id } = router.query

    const { 'odinauth.token': token } = parseCookies()
    const _header = { headers: { "Authorization": `Bearer ${token}` } }

    useEffect(() => {
        if (id) {
            axios.get('/api/purveyor?id=' + id, _header)
                .then(response => {
                    setTradingName(response.data.response.tradingName)
                })
                .catch((error) => {
                    console.log(error.response.data)
                })
        }
    }, [id])

    const handleDeleteSupplier = async () => {
        // delete
        axios.delete('/api/purveyor?id=' + id, _header)
            .then((response) => {
                if (response.status == 204) goBack()
            })
            .catch((error) => console.log(error))
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