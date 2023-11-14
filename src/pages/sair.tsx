import { useRouter } from "next/router";
import { destroyCookie } from "nookies";

export default function Logout() {

    const { push } = useRouter()
    destroyCookie(null, 'odinauth.token')

    const logoutRedirect = () => {
        push("/login")
    }

    logoutRedirect()
    return <div>Sair</div>
}
