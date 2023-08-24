import HomeTemplate from "../template"
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Home | ODIN',
}

export default function Page() {
    const title = "Hello World, You'r Home!"
    return (
        <HomeTemplate text={title}/>
    )
}