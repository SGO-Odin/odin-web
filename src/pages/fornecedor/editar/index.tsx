import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SupplierFormTemplate from "../template";

export default function EditSupplierPage() {

    // Cadastrar Fornecedor
    const [companyName, setCompanyName] = useState<string>("")
    const [businessName, setBusinessName] = useState<string>("")
    const [isLaboratory, setIsLaboratory] = useState<boolean>(false)

    // Endereço
    const [zipCode, setzipCode] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [district, setDistrict] = useState<string>("")
    const [numberAddress, setnumberAddress] = useState<string>("")
    const [complement, setComplement] = useState<string>("")
    const [city, setCity] = useState<string>("")

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (!id) { return }
        axios.get('/api/supplier?id=' + id)
            .then(response => {
                setCompanyName(response.data.companyName)
                setBusinessName(response.data.businessName)
                setIsLaboratory(response.data.isLaboratory)
                setzipCode(response.data.zipCode)
                setAddress(response.data.address)
                setDistrict(response.data.district)
                setnumberAddress(response.data.numberAddress)
                setComplement(response.data.complement)
                setCity(response.data.city)
            })
    }, [id])

    const handleUpdateBrand = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = { companyName, businessName, isLaboratory, zipCode, address, district, numberAddress, complement, city }
        // update
        await axios.put('/api/supplier', { ...data, id })

        goBack()
    }

    const goBack = () => {
        router.back()
    }

    return (
        <SupplierFormTemplate
            companyName={companyName}
            setCompanyName={setCompanyName}
            businessName={businessName}
            setBusinessName={setBusinessName}
            isLaboratory={isLaboratory}
            setIsLaboratory={setIsLaboratory}
            zipCode={zipCode}
            setzipCode={setzipCode}
            address={address}
            setAddress={setAddress}
            district={district}
            setDistrict={setDistrict}
            numberAddress={numberAddress}
            setnumberAddress={setnumberAddress}
            complement={complement}
            setComplement={setComplement}
            city={city}
            setCity={setCity}
            handleSupplier={handleUpdateBrand}
            goBack={goBack}
            title={`Editar Fornecedor ${companyName}`}
            paragraph={`Atualize informações de ${companyName}, garantindo precisão nos registros de contato e suprimentos.`} />
    );
}