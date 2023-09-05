'use client'

import { usePathname } from "next/navigation"
import { checkIsPublicRoute } from "../hook/check-is-public-route"
import { PrivateRoute } from "../components/privateRoute"
import '@/style/global.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname()
  const isPublicPage = checkIsPublicRoute(pathname)

  return (
    <html lang="pt-br">
        <body>
          {isPublicPage && children}
          {!isPublicPage && (
            <PrivateRoute>
              {children}
            </PrivateRoute>
          )}
        </body>
    </html>
  )
}