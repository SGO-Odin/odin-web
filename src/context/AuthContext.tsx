import { createContext, useEffect, useState } from "react";
import { IUser, ISignInData } from "../interface/utils";
import { recoverUserInformation, signInRequest } from "../service/auth";
import { parseCookies, setCookie } from "nookies";
import { useRouter } from "next/navigation";
import axiosBackend from "axios";

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

  async function singIn({ login, password }: ISignInData) {
    const data = {
      "userName": login,
      "password": password
    }

    axiosBackend.post('/api/auth', data)
      .then((response) => {

        if (response.status) {
          const token = response.data.data

          setCookie(undefined, 'odinauth.token', token, {
            maxAge: 60 * 60 * 1 // 1 hour
          })

          if (token) {
            const dataUser: IUser = {
              email: login,
              // photo: `../images/${(login.charAt(0)).toLowerCase()}.jpg`
            }
            setUser(dataUser)
            push("/")
          }
          push("/login")

        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // const { token, user } = await signInRequest({
  //   login, password
  // })

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, singIn }}>
      {children}
    </AuthContext.Provider>
  );
}