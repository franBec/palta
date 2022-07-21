import paltaController from "../../../controllers/paltaController";

//prettier-ignore
export default async function handler(req, res) {
  const { method, body, query } = req;
  
  var log = ''
  var errors = [] //un arreglo de strings donde se van a listar los errores


  switch (method) {
    case "POST":
      try {
        console.log(new Date().toUTCString() + ' api/palta/index.js -> POST requested! body = '+JSON.stringify(body))
        if(body && Object.keys(body).length === 0 && Object.getPrototypeOf(body) === Object.prototype){
            log = new Date().toUTCString() + ' api/palta/index.js -> No se encontró body para llamar en paltaControler'
            console.log(log)
            errors.push(log)
            
            return res.status(400).json({
                status: 400,
                success: false,
                data: [],
                errors: errors
            })
        }

        const params = body
        const resFromController = await paltaController(params)
        console.log(resFromController)
        if(resFromController.success){
            return res.status(200).json(resFromController)
        }
        else{
            res.status(500).json(resFromController)
        }
      } catch (error) {
        console.error(error)
        errors.push(log)
        return res.status(400).json({
          status: 400,
          success: false,
          data: [],
          errors: errors
      })
      }
    break;
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
        if(resFromController.success){
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

        console.log(new Date().toUTCString() + ' api/palta/index.js -> DELETE requested! body = '+JSON.stringify(body))
        if(body && Object.keys(body).length === 0 && Object.getPrototypeOf(body) === Object.prototype){
            log = new Date().toUTCString() + ' api/palta/index.js -> No se encontró body para llamar en paltaControler'
            console.log(log)
            errors.push(log)
            
            return res.status(400).json({
                status: 400,
                success: false,
                data: [],
                errors: errors
            })
        }
        
        console.log(body)

        const params = body
        const resFromController = await paltaController(params)
        console.log("respuesta")
        console.log(resFromController)
        if(resFromController.succcess){
            return res.status(200).json(resFromController)
        }else{
          return res.status(500).json(resFromController)
        }

      } catch (error) {
        console.log(error)
        return res.status(500).json({
          status: 400,
          success: false,
          data: [],
          errors: [error]
      })
      }

    default:
      return res.status(405).json({});
  }
}
