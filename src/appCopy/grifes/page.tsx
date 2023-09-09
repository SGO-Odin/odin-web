import { BrandsTemplate } from '@/src/template/Grifes'
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Grifes | ODIN',
}

export default function Brands() {
  return (
    <BrandsTemplate/>
  )
}
