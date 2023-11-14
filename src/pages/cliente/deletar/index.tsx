import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Modal } from "@/src/components/modal";
import { ButtonsTertiary } from "@/src/components/buttons/tertiary";
import { ButtonsPrimary } from "@/src/components/buttons/primary";
import { parseCookies } from 'nookies';

export default function DeleteClientPage() {

    const [name, setName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")

    const [isOpen, setIsOpen] = useState<boolean>(true)
    const router = useRouter()
    const { id } = router.query

    const { 'odinauth.token': token } = parseCookies()
    const _header = { headers: { "Authorization": `Bearer ${token}` } }


    useEffect(() => {
        if (id) {
            axios.get('/api/client?id=' + id, _header)
                .then(response => {
                    setName(response.data.name)
                    setLastName(response.data.lastName)
                })
        }
    }, [id])

    const handleDeleteBrand = async () => {

        // delete
        await axios.delete('/api/client?id=' + id, _header)

        goBack()
    }

    const goBack = () => {
        router.push('/cliente')
    }

    if (isOpen) {
        return (
            <Modal
                title={`Deseja deletar ${name} ${lastName}?`}
                paragraph={`Atenção! A ação de "Deletar ${name} ${lastName}" é irreversível. Ao confirmar, a marca será removida permanentemente. Certifique-se da ação antes de prosseguir.`}
                isOpenModal={isOpen}
                setIsOpenModal={setIsOpen}>
                <ButtonsTertiary onClick={goBack}>Cancelar</ButtonsTertiary>
                <ButtonsPrimary onClick={handleDeleteBrand}>Deletar {name} {lastName}</ButtonsPrimary>
            </Modal>
        );
    } else {
        goBack()
    }
}