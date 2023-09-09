import { DashboardTemplate } from "../template/Dashboard"

export default function Dashboard() {
    const title = "Hello World, You'r Home!"

    return (
        <DashboardTemplate text={title}/>
    )
}