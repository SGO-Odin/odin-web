import type { NextApiRequest, NextApiResponse } from 'next'
// import { Product } from '../../../models/product'
// import { mongooseConnect } from '../../../lib/mongoose'

// type Data = {
//   name: string
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const {method} = req
  

//   if(method === 'POST') {
//     const {name, active} = req.body
//     const productDoc = await Product.create({
//         name, active,
//     })
//     res.json(productDoc)
//   }
// }