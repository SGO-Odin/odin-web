import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Modal } from "@/src/components/modal";
import { ButtonsTertiary } from "@/src/components/buttons/tertiary";
import { ButtonsPrimary } from "@/src/components/buttons/primary";
import { parseCookies } from "nookies";

export default function DeleteBrandPage() {

    const [brands, setBrands] = useState<string>("")

    const [isOpen, setIsOpen] = useState<boolean>(true)
    const router = useRouter()
    const { id } = router.query
    const { 'odinauth.token': token } = parseCookies()

    useEffect(() => {
        if (id) {
            axios.get('/api/brands?id=' + id, { headers: { "Authorization": `Bearer ${token}` } })
                .then(response => {
                    setBrands(response.data.response.name)
                })
                .catch((error) => {
                    console.log(error.response.data)
                })
        }
    }, [id])

    const handleDeleteBrand = async () => {

        // delete
        axios.delete('/api/brands?id=' + id, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => console.log(response))

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
                setIsOpenModal={goBack}>
                <ButtonsTertiary onClick={goBack}>Cancelar</ButtonsTertiary>
                <ButtonsPrimary onClick={handleDeleteBrand}>Deletar {brands}</ButtonsPrimary>
            </Modal>
        );
    } else {
        goBack()
    }
}