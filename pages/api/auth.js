import { withSessionRoute } from "../../lib/session";
import userController from "../../controllers/userController";

const ERROR_CREDENTIALS = "Usuario y/o contraseña incorrecta";

export default withSessionRoute(loginRoute);

async function loginRoute(req, res) {
    try {
        const { method, body, query } = req;
        var log = ''
        var errors = [] //un arreglo de strings donde se van a listar los errores

        console.log(new Date().toUTCString() + ' api/auth/login.js -> POST requested! body = '+JSON.stringify(body))
        if(body && Object.keys(body).length === 0 && Object.getPrototypeOf(body) === Object.prototype){
            log = new Date().toUTCString() + ' api/auth/login.js -> No se encontró body para llamar en paltaControler'
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
        const resFromController = await userController(params)
        console.log("Login: ",resFromController)
        if(resFromController.success){
            req.session.user = resFromController;
            await req.session.save();
            console.log("Sesion guardada")
            return res.status(200).json(resFromController)
        }
        else{
            res.status(500).json(resFromController)
        }
        } catch (error) {
            console.error(error)
            errors.push(log)
            return res.status(403).json({
            status: 403,
            success: false,
            data: [{mensaje: ERROR_CREDENTIALS, error}],
            errors: errors
        })
      }
}