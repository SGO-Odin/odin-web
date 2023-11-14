import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BrandsFormTemplate from "../template";
import { parseCookies } from "nookies";

export default function EditBrandPage() {

    const [name, setName] = useState<string>("")
    const router = useRouter()
    const { id } = router.query
    const { 'odinauth.token': token } = parseCookies()

    useEffect(() => {

        if (!id) { return }
        axios.get('/api/brands?id=' + id, { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
                setName(response.data.response.name)
            })
    }, [id])

    const handleUpdateBrand = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = { name, id }

        // update
        axios.put('/api/brands', data, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => response.status === 200 ? goBack() : null)
            .catch((error) => console.log(error))
    }

    const goBack = () => {
        router.push('/grifes')
    }

    return (
        <BrandsFormTemplate
            handleBrands={handleUpdateBrand}
            name={name}
            setName={setName}
            goBack={goBack}
            title={`Editar Marca ${name}`}
            paragraph={`Atualize as informações da marca ${name}, mantendo os registros precisos e atualizados.`} />
    );
}