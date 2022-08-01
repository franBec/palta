import paltaController from "../../../controllers/paltaController";

import { withSessionRoute } from "../../../lib/session";

export default withSessionRoute(handler);

/* 
  Todo respuesta de esta api, tiene la siguiente estructura:
  {
    status: number,
    success: boolean,
    errors: [string],
    data: [{object}],
    metaData: {object},
  }
  - metaData opcional
*/

//prettier-ignore
async function handler(req, res) {
  const { method, body, query } = req;
  const user = req.session.user;
  
  var log = ''
  var errors = [] //un arreglo de strings donde se van a listar los errores

  //check if 401
  if (!user || user.isLoggedIn === false) {
    errors.push(new Date().toUTCString() + " api/palta/index.js -> Status 401 Unauthorized")
    return res.status(401).json({ errors });
  }

  switch (method) {
    case "POST":
      try {
        console.log(new Date().toUTCString() + ' api/palta/index.js -> POST requested! body = '+JSON.stringify(body))
        if(!body?.action || body?.action !== "create"){
            log = new Date().toUTCString() + ' api/palta/index.js -> No se encontró o no es válido action para llamar en paltaController'
            console.log(log)
            errors.push(log)
            
            return res.status(400).json({
              status: 400,
              success: false,
              data: [],
              errors: errors
            })
        }

        const resFromController = await paltaController(body)
        console.log(new Date().toUTCString() + " api/palta/index.js -> POST resFromController = " + JSON.stringify(resFromController))
        if(resFromController.success){
          return res.status(200).json(resFromController)
        }
        else{
          return res.status(500).json(resFromController)
        }
      } catch (error) {
        log = new Date().toUTCString() + " api/palta/index.js -> POST error = " + error.toString();
        errors.push(log);
        console.error(log);
        return res.status(500).json({
          status: 500,
          success: false,
          data: [],
          errors: errors
        });
      }
    break;
    case "GET":
      try {
        console.log(new Date().toUTCString() + ' api/palta/index.js -> GET requested! query = '+JSON.stringify(query))
        if(!query?.action || query?.action !== "findAll"){
            log = new Date().toUTCString() + ' api/palta/index.js -> No se encontró o no es válido action para llamar en paltaControler'
            console.log(log)
            errors.push(log)
            
            return res.status(400).json({
              status: 400,
              success: false,
              data: [],
              errors: errors
            })
        }

        const resFromController = await paltaController(query)
        console.log(new Date().toUTCString() + " api/palta/index.js -> GET resFromController = " + JSON.stringify(resFromController) )
        if(resFromController.success){
            return res.status(200).json(resFromController)
        }
        else{
            return res.status(500).json(resFromController)
        }
      } catch (error) {
        log = new Date().toUTCString() + " api/palta/index.js -> GET error = " + error.toString();
        errors.push(log);
        console.error(log);
        return res.status(500).json({
          status: 500,
          success: false,
          data: [],
          errors: errors
        });
      }
    break;
    case "PUT":
      try {
        console.log(new Date().toUTCString() + ' api/palta/index.js -> PUT requested! body = '+JSON.stringify(body))
        if(!body?.action || body?.action !== "update"){
          log = new Date().toUTCString() + ' api/palta/index.js -> No se encontró o no es válido action para llamar en paltaController'
          console.log(log)
          errors.push(log)
          
          return res.status(400).json({
            status: 400,
            success: false,
            data: [],
            errors: errors
          })
        }

        const resFromController = await paltaController(body)
        console.log(new Date().toUTCString() + " api/palta/index.js -> PUT resFromController = " + JSON.stringify(resFromController))
        if(resFromController.success){
          return res.status(200).json(resFromController)
        }
        else{
          return res.status(500).json(resFromController)
        }
      } catch (error) {
        log = new Date().toUTCString() + " api/palta/index.js -> PUT error = " + error.toString();
        errors.push(log);
        console.error(log);
        return res.status(500).json({
          status: 500,
          success: false,
          data: [],
          errors: errors
        });
      };
    break;
    case "DELETE":
      try {
        console.log(new Date().toUTCString() + ' api/palta/index.js -> DELETE requested! body = '+JSON.stringify(body))
        if(!body?.action || body?.action !== "deleteById"){
          log = new Date().toUTCString() + ' api/palta/index.js -> No se encontró action o no es válido para llamar en paltaControler'
          console.log(log)
          errors.push(log)
          
          return res.status(400).json({
            status: 400,
            success: false,
            data: [],
            errors: errors
          })
        }

        const resFromController = await paltaController(body)
        console.log(new Date().toUTCString() + " api/palta/index.js -> DELETE resFromController = " + JSON.stringify(resFromController) )
        if(resFromController.success){
          return res.status(200).json(resFromController)
        }else{
          return res.status(500).json(resFromController)
        }

      } catch (error) {
        log = new Date().toUTCString() + " api/palta/index.js -> DELETE error = " + error.toString();
        errors.push(log);
        console.error(log);
        return res.status(500).json({
          status: 500,
          success: false,
          data: [],
          errors: errors
        });
      }
    break;
    default:
      return res.status(405).json({success: false, data:{}, errors:['Metodo no soportado -Los pibes de runa']});
  }
}
