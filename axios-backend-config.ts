import axios from "axios"

const axiosBackend = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://127.0.0.1:8080/',
        'Origin': 'http://127.0.0.1:3000/'
    },
    withCredentials: true
})

export default axiosBackend