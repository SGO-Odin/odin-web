"use client";

import { usePathname } from "next/navigation";
import { checkIsPublicRoute } from "../hook/check-is-public-route";
import { PrivateRoute } from "../components/privateRoute";
import "@/style/global.scss";
import AuthProvider from "../context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPublicPage = checkIsPublicRoute(pathname);

  return (
    <html lang="pt-br">
      <body>
        <AuthProvider>
          {isPublicPage && children}
          {!isPublicPage && <PrivateRoute>{children}</PrivateRoute>}
        </AuthProvider>
      </body>
    </html>
  );
}
