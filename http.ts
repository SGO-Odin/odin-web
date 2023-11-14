import { parseCookies } from "nookies"

const axios = require('axios')

const { 'odinauth.token': token } = parseCookies()

const axiosFrontend = axios.create({
    baseURL: 'http://127.0.0.1:3000/',
    headers: {
        'Authorization': `Bearer ${token}`,
    },
})

export default axiosFrontend