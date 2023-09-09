import { RegisterTemplate } from '@/src/template/Cadastrar'
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Cadastrar | ODIN',
}

export default function Register() {
  return (
    <RegisterTemplate/>
  )
}
