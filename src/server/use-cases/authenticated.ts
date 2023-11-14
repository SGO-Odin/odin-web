import axios from "axios"
import { NextApiRequest } from "next"

const authenticated = async (req: NextApiRequest): Promise<string> => {

    const token = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}api/authenticate`, req.body)

    return token.data
}

export const authenticatedUseCases = {
    authenticated
}