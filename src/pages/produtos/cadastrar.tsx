import { useRouter } from "next/navigation";
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useState } from "react";
import ProductFormTemplate from "./template";
import axios from "axios";
import Head from "next/head";

export default function NewProduct() {
    const { push } = useRouter();
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
    const [purveyor, setPurveyor] = useState<number>(null)
    const [isActive, setIsActive] = useState<boolean>(false)
    const [isStockControl, setIsStockControl] = useState<boolean>(false)
    const [isService, setIsService] = useState<boolean>(false)

    const handleNewProduct = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = { cost, selling, stockMin, stockCurrent, location, reference, nameProduct, unit, brands, purveyor, isActive, isStockControl, isService }
        
        const { 'odinauth.token': token } = parseCookies()

        // create
        axios.post('/api/product', data, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {
                if (res.status == 201) goBack()
            })
            .catch((error) => {
                console.log(error.response.data)
            })
    }

    const goBack = () => {
        push('/produtos')
    }
    return (
        <>
            <Head>
                <title>Cadastrar Produtos | ODIN</title>
            </Head>
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
                purveyor={purveyor}
                setPurveyor={setPurveyor}
                isActive={isActive}
                setIsActive={setIsActive}
                isStockControl={isStockControl}
                setIsStockControl={setIsStockControl}
                isService={isService}
                setIsService={setIsService}
                handleProduct={handleNewProduct}
                goBack={goBack}
                title="Cadastrar Produto"
                paragraph={`A página de cadastro de produtos permite adicionar novos produtos ao estoque da ótica. Insira detalhes, como nome, preço e descrição, para atualizar nosso catálogo.`} />
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { "odinauth.token": token } = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: {

        }
    }
}