const axios = require('axios')



const axiosFrontend = axios.create({
    baseURL: 'http://127.0.0.1:3000/',
    headers: {
        'constent-type': 'application/json',
    },
    withCredentials: true,
})

export default axiosFrontend