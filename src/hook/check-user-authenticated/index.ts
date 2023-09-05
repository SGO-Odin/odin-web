import { parseCookies } from "nookies"

export const checkUserAuthemticated = () => {
    const { 'odinauth.token': userToken } = parseCookies()
    return !!userToken
}