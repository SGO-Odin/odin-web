import TokenTemplate from '@/src/template/Token'
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Token | ODIN',
}

export default function Token() {
  return (
    <TokenTemplate/>
  )
}
