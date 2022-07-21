import paltaController from "../../../controllers/paltaController";

//prettier-ignore
export default async function handler(req, res) {
  const { method, body, query } = req;
  
  var log = ''
  var errors = [] //un arreglo de strings donde se van a listar los errores


  switch (method) {
    case "POST":
      try {
      } catch (error) {}

    case "GET":
      try {
        console.log(new Date().toUTCString() + ' api/palta/index.js -> GET requested! query = '+JSON.stringify(query))
        if(query && Object.keys(query).length === 0 && Object.getPrototypeOf(query) === Object.prototype){
            log = new Date().toUTCString() + ' api/palta/index.js -> No se encontró params para llamar en paltaControler'
            console.log(log)
            errors.push(log)
            
            return res.status(400).json({
                status: 400,
                success: false,
                data: [],
                errors: errors
            })
        }

        const params = query
        const resFromController = await paltaController(params)
        console.log(resFromController)
        if(resFromController.succcess){
            return res.status(200).json(resFromController)
        }
        else{
            res.status(500).json(resFromController)
        }
        

      } catch (error) {
        
      }

    case "PUT":
      try {
      } catch (error) {}

    case "DELETE":
      try {
      } catch (error) {}

    default:
      return res.status(405).json({});
  }
}
