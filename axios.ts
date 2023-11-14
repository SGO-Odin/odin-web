import axios from "axios"
import { parseCookies } from "nookies"

const { 'odinauth.token': token } = parseCookies()

console.log(`TOKEN: ${token}`)

const axiosBackend = axios.create({
    Headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': 'http://127.0.0.1:8080/',
        'Origin': 'http://127.0.0.1:3000/'
    },
    withCredentials: true
})

export default axiosBackend

axiosBackend.defaults.headers.authorization = `Bearer ${token}`;