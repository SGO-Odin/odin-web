import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BrandsFormTemplate from "../template";

export default function EditBrandPage() {

    const [name, setName] = useState<string>("")
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (!id) { return }
        axios.get('/api/brands?id=' + id)
            .then(response => {
                setName(response.data.response.name)
            })
    }, [id])

    const handleUpdateBrand = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // update
        await axios.put('/api/brands', { name, id })

        goBack()
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