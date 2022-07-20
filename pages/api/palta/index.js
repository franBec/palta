//import paltas from "./paltaDB";

import prisma from "../../../lib/prisma";

//prettier-ignore
export default async function handler(req,res){
    const {method} = req

    switch(method){
        case 'GET':
            try{
                console.log('entro al GET')
                
                const data = await prisma.Palta.findMany()

                return res.status(200).json({
                    success: true,
                    data: data
                 })

            }catch(error){
                console.error(error)
                return res.status(500).json({ success: false})
            }
            
        default:
            return res.status(405).json({ success: false})
    }
}
