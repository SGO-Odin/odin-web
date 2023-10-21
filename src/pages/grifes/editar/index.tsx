import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BrandsFormTemplate from "../template";

export default function EditBrandPage() {

    const [brands, setBrands] = useState<string>("")
    const [isActive, setIsActive] = useState<boolean>(false)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (!id) { return }
        axios.get('/api/brands?id=' + id)
            .then(response => {
                setBrands(response.data.brands)
                setIsActive(response.data.isActive)
            })
    }, [id])

    const handleUpdateBrand = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        const data = { brands, isActive }
        // update
        await axios.put('/api/brands', { ...data, id })

        goBack()
    }

    const goBack = () => {
        router.back()
    }

    return (
        <BrandsFormTemplate
            handleBrands={handleUpdateBrand}
            brands={brands}
            setBrands={setBrands}
            isActive={isActive}
            setIsActive={setIsActive}
            goBack={goBack}
            title={`Editar Marca ${brands}`}
            paragraph={`Atualize as informações da marca ${brands}, mantendo os registros precisos e atualizados.`} />
    );
}