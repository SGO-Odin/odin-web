import { Metadata } from "next"
import Dashboard from "./dashboard/page"

export const metadata: Metadata = {
    title: 'Dashboard | ODIN',
}

export default function Home() {
    const title = "Hello World, You'r Home!"
    return (
        <Dashboard text={title} />
    )
}