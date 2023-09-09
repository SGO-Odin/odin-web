import type { AppProps } from "next/app";
import "@/style/global.scss";
import AuthProvider from "../context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
