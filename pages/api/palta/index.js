import paltas from "./paltaDB";

//prettier-ignore
export default async function handler(req,res){
    const {method} = req

    switch(method){
        case 'GET':
            try{
                const data = paltas.data
                
                //404
                if(!data.length){
                    return res.status(404).json({
                        success: false,
                        data: []
                    })
                }

                console.table(data)
                return res.status(200).json({
                    success: true,
                    data: data
                 })

            }catch(error){
                return res.status(500).json({ success: false})
            }
            
        default:
            return res.status(405).json({ success: false})
    }
}
