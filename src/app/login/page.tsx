import LoginTemplate from '@/src/template/Login'
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Login | ODIN',
}

export default function Login() {
  return (
    <LoginTemplate/>
  )
}
