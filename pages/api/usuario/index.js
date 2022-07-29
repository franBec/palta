import usuarioController from "../../../controllers/usuarioController";

export default async function handler(req, res) {
  const { method, body, query } = req;
  
  var log = ''
  var errors = [] //un arreglo de strings donde se van a listar los errores


  switch (method) {
    case "POST":
      try {
        console.log(new Date().toUTCString() + ' api/usuario/index.js -> POST requested! body = '+JSON.stringify(body))
        if(!body?.action){
            log = new Date().toUTCString() + ' api/usuario/index.js -> No se encontró o no es válido action para llamar en usuarioController'
            console.log(log)
            errors.push(log)
            
            return res.status(400).json({
              status: 400,
              success: false,
              data: [],
              errors: errors
            })
        }

        const resFromController = await usuarioController(body)
        console.log(new Date().toUTCString() + " api/usuario/index.js -> POST resFromController = " + JSON.stringify(resFromController))
        if(resFromController.success){
          return res.status(200).json(resFromController)
        }
        else{
          return res.status(500).json(resFromController)
        }
      } catch (error) {
        log = new Date().toUTCString() + " api/usuario/index.js -> POST error = " + error.toString();
        errors.push(log);
        console.error(log);
        return res.status(500).json({
          status: 500,
          success: false,
          data: [],
          errors: errors
        });
      }

    case "GET":
      try {
        console.log(new Date().toUTCString() + ' api/usuario/index.js -> GET requested! query = '+JSON.stringify(query))
        if(!query?.action){
            log = new Date().toUTCString() + ' api/usuario/index.js -> No se encontró o no es valido action para llamar en usuarioController'
            console.log(log)
            errors.push(log)
            
            return res.status(400).json({
              status: 400,
              success: false,
              data: [],
              errors: errors
            })
        }

        const resFromController = await usuarioController(query)
        console.log(new Date().toUTCString() + " api/usuario/index.js -> GET resFromController = " + JSON.stringify(resFromController) )
        if(resFromController.success){
            return res.status(200).json(resFromController)
        }
        else{
            return res.status(500).json(resFromController)
        }
      } catch (error) {
        log = new Date().toUTCString() + " api/usuario/index.js -> GET error = " + error.toString();
        errors.push(log);
        console.error(log);
        return res.status(500).json({
          status: 500,
          success: false,
          data: [],
          errors: errors
        });
      }

    case "PUT":
      try {
        console.log(new Date().toUTCString() + ' api/usuario/index.js -> PUT requested! body = '+JSON.stringify(body))
        if(!body?.action){
          log = new Date().toUTCString() + ' api/usuario/index.js -> No se encontró o no es valido action para llamar en usuarioController'
          console.log(log)
          errors.push(log)
          
          return res.status(400).json({
            status: 400,
            success: false,
            data: [],
            errors: errors
          })
        }

        const resFromController = await usuarioController(body)
        console.log(new Date().toUTCString() + " api/usuario/index.js -> PUT resFromController = " + JSON.stringify(resFromController))
        if(resFromController.success){
          return res.status(200).json(resFromController)
        }
        else{
          return res.status(500).json(resFromController)
        }
      } catch (error) {
        log = new Date().toUTCString() + " api/usuario/index.js -> PUT error = " + error.toString();
        errors.push(log);
        console.error(log);
        return res.status(500).json({
          status: 500,
          success: false,
          data: [],
          errors: errors
        });
      };

    case "DELETE":
      try {
        console.log(new Date().toUTCString() + ' api/usuario/index.js -> DELETE requested! body = '+JSON.stringify(body))
        if(!body?.action){
          log = new Date().toUTCString() + ' api/usuario/index.js -> No se encontró action o no es valido para llamar en usuarioController'
          console.log(log)
          errors.push(log)
          
          return res.status(400).json({
            status: 400,
            success: false,
            data: [],
            errors: errors
          })
        }

        const resFromController = await usuarioController(body)
        console.log(new Date().toUTCString() + " api/usuario/index.js -> DELETE resFromController = " + JSON.stringify(resFromController) )
        if(resFromController.success){
          return res.status(200).json(resFromController)
        }else{
          return res.status(500).json(resFromController)
        }

      } catch (error) {
        log = new Date().toUTCString() + " api/usuario/index.js -> DELETE error = " + error.toString();
        errors.push(log);
        console.error(log);
        return res.status(500).json({
          status: 500,
          success: false,
          data: [],
          errors: errors
        });
      }

    default:
      return res.status(405).json({success: false, data:{}, errors:['Metodo no soportado -Los pibes de runa']});
  }
}
