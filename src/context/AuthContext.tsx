import { createContext, useEffect, useState } from "react";
import { IUser, ISignInData } from "../interface/utils";
import { recoverUserInformation, signInRequest } from "../service/auth";
import { parseCookies, setCookie } from "nookies";
import { useRouter } from "next/navigation";

interface IAUthContextType {
  isAuthenticated: boolean
  user: IUser
  singIn: (data: ISignInData) => Promise<void>
}

export const AuthContext = createContext({} as IAUthContextType);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<IUser | null>(null)
  const isAuthenticated = !!user;
  const { push } = useRouter();

  useEffect(() => {
    const { 'odinauth.token': token } = parseCookies()

    if (token) {
      recoverUserInformation(token).then(response => {
        setUser(response.user)
      })
    }
  }, [])

  async function singIn({ login, password } : ISignInData) {
    const { token, user } = await signInRequest({
      login, password
    })

    setCookie(undefined, 'odinauth.token', token, {
      maxAge: 60 * 60 * 1 // 1 hour
    })

    setUser(user)
    console.log(user)
    push('/')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, singIn }}>
      {children}
    </AuthContext.Provider>
  );
}
function permanentRedirect(arg0: string) {
  throw new Error("Function not implemented.");
}

