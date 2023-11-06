import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SupplierFormTemplate from "../template";

export default function EditSupplierPage() {

    // Cadastrar Fornecedor
    const [companyName, setCompanyName] = useState<string>("")
    const [tradingName, setTradingName] = useState<string>("")
    const [isLaboratory, setIsLaboratory] = useState<boolean>(false)

    // Endereço
    const [zipCode, setZipCode] = useState<string>("")
    const [acronym, setAcronym] = useState<string>("")
    const [stateName, setStateName] = useState<string>("")
    const [isFederalDistrict, setIsFederalDistrict] = useState<boolean>(false)
    const [publicPlaceName, setPublicPlaceName] = useState<string>("")
    const [publicPlaceType, setPublicPlaceType] = useState<string>("STREET")
    const [district, setDistrict] = useState<string>("")
    const [number, setNumber] = useState<string>("")
    const [complement, setComplement] = useState<string>("")
    const [reference, setReference] = useState<string>("")
    const [city, setCity] = useState<string>("")

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (!id) { return }
        axios.get('/api/supplier?id=' + id)
            .then(response => {
                setAcronym(response.data.acronym)
                setStateName(response.data.stateName)
                setIsFederalDistrict(response.data.isFederalDistrict)
                setPublicPlaceType(response.data.publicPlaceType)
                setReference(response.data.reference)
                setCompanyName(response.data.companyName)
                setTradingName(response.data.tradingName)
                setIsLaboratory(response.data.isLaboratory)
                setZipCode(response.data.zipCode)
                setPublicPlaceName(response.data.address)
                setDistrict(response.data.district)
                setNumber(response.data.number)
                setComplement(response.data.complement)
                setCity(response.data.city)
            })
    }, [id])

    const handleUpdateBrand = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = { companyName, tradingName, isLaboratory, zipCode, acronym, stateName, isFederalDistrict, publicPlaceName, publicPlaceType, district, number, complement, reference, city }
        // update
        await axios.put('/api/supplier', { ...data, id })

        goBack()
    }

    const goBack = () => {
        router.push('/fornecedor')
    }

    return (
        <SupplierFormTemplate
            companyName={companyName}
            setCompanyName={setCompanyName}
            tradingName={tradingName}
            setTradingName={setTradingName}
            isLaboratory={isLaboratory}
            setIsLaboratory={setIsLaboratory}
            zipCode={zipCode}
            setZipCode={setZipCode}
            acronym={acronym}
            setAcronym={setAcronym}
            stateName={stateName}
            setStateName={setStateName}
            isFederalDistrict={isFederalDistrict}
            setIsFederalDistrict={setIsFederalDistrict}
            publicPlaceName={publicPlaceName}
            setPublicPlaceName={setPublicPlaceName}
            publicPlaceType={publicPlaceType}
            setPublicPlaceType={setPublicPlaceType}
            district={district}
            setDistrict={setDistrict}
            number={number}
            setNumber={setNumber}
            complement={complement}
            setComplement={setComplement}
            reference={reference}
            setReference={setReference}
            city={city}
            setCity={setCity}
            handleSupplier={handleUpdateBrand}
            goBack={goBack}
            title={`Editar Fornecedor ${companyName}`}
            paragraph={`Atualize informações de ${companyName}, garantindo precisão nos registros de contato e suprimentos.`} />
    );
}