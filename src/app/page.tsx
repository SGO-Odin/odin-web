import { Dashboard } from "@/src/template/Dashboard"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Dashboard | ODIN',
}

export default async function Home() {
    const title = "Hello World, You'r Home!"

    return (
        <Dashboard text={title} />
    )
}