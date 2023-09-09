import ResetPasswordTemplate from '@/src/template/RedefinirSenha'
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Redefinir Senha | ODIN',
}

export default function ResetPassword() {
  return (
    <ResetPasswordTemplate/>
  )
}
