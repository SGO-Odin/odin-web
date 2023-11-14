import { createContext, useEffect, useState } from "react";
import { IUser, ISignInData } from "../interface/utils";
import { recoverUserInformation, signInRequest } from "../service/auth";
import { parseCookies, setCookie } from "nookies";
import { useRouter } from "next/navigation";
import axios from "axios";
import qs from 'querystring'

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

    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: data,
      url: `http://127.0.0.1:8080/api/authenticate`
    };

    axios(options)
      .then((response) => {

        if (response.status) {
          const token = response.data

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
        return error
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