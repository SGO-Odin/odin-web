import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Modal } from "@/src/components/modal";
import { ButtonsTertiary } from "@/src/components/buttons/tertiary";
import { ButtonsPrimary } from "@/src/components/buttons/primary";
import { IClient, IOrderService } from "@/src/interface/datas";
import Head from "next/head";
import { parseCookies } from "nookies";

export default function DeleteBrandPage() {

    const [brands, setBrands] = useState<string>("")

    const [isOpen, setIsOpen] = useState<boolean>(true)
    const router = useRouter()
    const { id } = router.query

    const [numberOS, setNumberOS] = useState<string>('')
    const [name, setName] = useState<string>('')

    const { 'odinauth.token': token } = parseCookies()
    const _header = { headers: { "Authorization": `Bearer ${token}` } }

    useEffect(() => {
        axios.get('/api/service-order?id=' + id, _header)
            .then(response => {
                console.log(response)
                setNumberOS(response.data.response.id)

                axios.get('/api/client?id=' + response.data.response.client, _header)
                    .then(response => {
                        setName(response.data.response.firstName)
                    })
                    .catch((error) => console.log(error))
            })
            .catch((error) => console.log(error))

    }, [])

    const handleDeleteBrand = async () => {

        // delete
        await axios.delete('/api/service-order?id=' + id, _header)
            .then((response) => {
                if (response.status == 204) goBack()
            })
            .catch((error) => console.log(error))

        goBack()
    }

    const goBack = () => {
        router.push('/ordem-servico')
    }

    if (isOpen) {
        return (
            <>
                <Head>
                    <title>Deletar ordem de Serviço | ODIN</title>
                </Head>
                <Modal
                    title={`Deseja realmente deletar essa O.S?`}
                    paragraph={`Atenção! A ação de "Deletar a O.S ${numberOS} de ${name}" é irreversível. Ao confirmar, a marca será removida permanentemente. Certifique-se da ação antes de prosseguir.`}
                    isOpenModal={isOpen}
                    setIsOpenModal={setIsOpen}>
                    <ButtonsTertiary onClick={goBack}>Cancelar</ButtonsTertiary>
                    <ButtonsPrimary onClick={handleDeleteBrand}>Deletar {brands}</ButtonsPrimary>
                </Modal>
            </>
        );
    } else {
        goBack()
    }
}