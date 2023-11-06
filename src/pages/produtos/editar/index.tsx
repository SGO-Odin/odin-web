import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductFormTemplate from "../template";

export default function EditProductPage() {

    const [cost, setCost] = useState<string>("")
    const [percentProfit, setPercentProfit] = useState<string>("")
    const [profit, setProfit] = useState<string>("")
    const [selling, setSelling] = useState<string>("")
    const [stockMin, setStockMin] = useState<string>("")
    const [stockCurrent, setStockCurrent] = useState<string>("")
    const [location, setLocation] = useState<string>("")

    const [reference, setReference] = useState<string>("")
    const [nameProduct, setNameProduct] = useState<string>("")
    const [unit, setUnit] = useState<string>("")
    const [brands, setBrands] = useState<number>(null)
    const [supplier, setSupplier] = useState<number>(null)
    const [isActive, setIsActive] = useState<boolean>(false)
    const [isStockControl, setIsStockControl] = useState<boolean>(false)
    const [isService, setIsService] = useState<boolean>(false)

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (!id) { return }
        axios.get('/api/product?id=' + id)
            .then(response => {
                setCost(response.data.cost)
                setPercentProfit(response.data.percentProfit)
                setProfit(response.data.profit)
                setSelling(response.data.selling)
                setStockMin(response.data.stockMin)
                setStockCurrent(response.data.stockCurrent)
                setLocation(response.data.location)
                setReference(response.data.reference)
                setNameProduct(response.data.nameProduct)
                setUnit(response.data.unit)
                setBrands(response.data.brands)
                setSupplier(response.data.supplier)
                setIsActive(response.data.isActive)
                setIsStockControl(response.data.isStockControl)
                setIsService(response.data.isService)

            })
    }, [id])

    const handleUpdateProduct = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        const data = { cost, selling, stockMin, stockCurrent, location, reference, nameProduct, unit, brands, supplier, isActive, isStockControl, isService }
        // update
        await axios.put('/api/product', { ...data, id })

        goBack()
    }

    const goBack = () => {
        router.push('/produtos')
    }

    return (
        <ProductFormTemplate
            cost={cost}
            setCost={setCost}
            percentProfit={percentProfit}
            setPercentProfit={setPercentProfit}
            profit={profit}
            setProfit={setProfit}
            selling={selling}
            setSelling={setSelling}
            stockMin={stockMin}
            setStockMin={setStockMin}
            stockCurrent={stockCurrent}
            setStockCurrent={setStockCurrent}
            location={location}
            setLocation={setLocation}
            reference={reference}
            setReference={setReference}
            nameProduct={nameProduct}
            setNameProduct={setNameProduct}
            unit={unit}
            setUnit={setUnit}
            brands={brands}
            setBrands={setBrands}
            supplier={supplier}
            setSupplier={setSupplier}
            isActive={isActive}
            setIsActive={setIsActive}
            isStockControl={isStockControl}
            setIsStockControl={setIsStockControl}
            isService={isService}
            setIsService={setIsService}
            handleProduct={handleUpdateProduct}
            goBack={goBack}
            title={`Editar o Produto ${nameProduct}`}
            paragraph={`A página de cadastro de produtos permite adicionar novos produtos ao estoque da ótica. Insira detalhes, como nome, preço e descrição, para atualizar nosso catálogo.`} />
    )
}