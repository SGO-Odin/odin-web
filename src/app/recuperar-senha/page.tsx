import { RecoverPasswordTemplate } from '@/src/template/RecuperarSenha'
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Recuperar Senha | ODIN',
}

export default function RecoverPassword() {
  return (
    <RecoverPasswordTemplate/>
  )
}
