import prisma from "../db/prisma";
import {validarEmail, validarFecha} from '../lib/validarService'
import { capitalizarString } from "../lib/stringService";

const errorGen =  "Algo salió mal, intente mas tarde"

const usuarioController = async (params) => {
  
  console.log(new Date().toUTCString() + " controllers/usuarioController.js -> params = " + JSON.stringify(params));

  switch (params.action) {
    case 'create':
      return create(params)
    case 'update':
      return update(params)
    case 'deleteById':
      return deleteById(params.id)
    default:
      return methodNotFound()
  }
};

const methodNotFound = () => (
  {
    status: 400,
    success: false,
    data: {},
    errors: [new Date().toUTCString() + ' controllers/usuarioController.js ->  method Not Found'],
  }
)

const validacionCreateUpdate = (params) =>{
  var errores = []
  
  if(!params.email?.length){
    errores.push('email es obligatorio')
  }

  if(params.email?.length > 191){
    errores.push('email debe ser menor a 191 caracteres')
  }

  if(!validarEmail(params.email)){
    errores.push('email no válido')
  }

  if(!params.firstName?.length){
    errores.push('firstName es obligatorio')
  }

  if(params.firstName?.length > 100){
    errores.push('firstName debe ser menor a 100 caracteres')
  }

  if(!params.lastName?.length){
    errores.push('lastName es obligatorio')
  }

  if(params.lastName?.length > 100){
    errores.push('lastName debe ser menor a 100 caracteres')
  }

  if(!params.fechaNacimiento?.length){
    errores.push('fechaNacimiento es obligatorio')
  }

  if(!validarFecha(params.fechaNacimiento)){
    errores.push('fechaNacimiento inválida. Se espera una fecha válida en formato YYYY-MM-DD HH:mm:ss')
  }

  if(!params.dni?.length){
    errores.push('dni es obligatorio')
  }

  if(Number(params.dni) < 0 || Number(params.dni) > 99999999){
    errores.push('dni inválido')
  }

  if(!params.address?.length){
    errores.push('address es obligatorio')
  }

  if(params.address?.length > 255){
    errores.push('address debe ser menor a 255 caracteres')
  }

  if(!params.userName?.length){
    errores.push('userName es obligatorio')
  }

  if(params.userName?.length > 100){
    errores.push('userName debe ser menor a 100 caracteres')
  }

  if(!params.telefono?.length){
    errores.push('telefono es obligatorio')
  }

  if(params.telefono?.length > 191){
    errores.push('telefono debe ser menor a 191 caracteres')
  }

  if(!params.pass?.length){
    errores.push('pass es obligatorio')
  }

  if(params.pass?.length > 100){
    errores.push('pass debe ser menor a 100 caracteres')
  }

  return errores
}

const create = async (params) =>{
  console.log(new Date().toUTCString() + " controllers/usuarioController.js -> create  params = " + JSON.stringify(params))
  try {
    
    const errorsInParams = validacionCreateUpdate(params)
    if(errorsInParams.length){
      return{
        status: 500,
        success: false,
        data: [],
        errors: errorsInParams,
      }
    }
    
    const usuario = await prisma.sec_usuario.create({
       data: {
         email: params.email,
         firstName: capitalizarString(params.firstName),
         lastName: capitalizarString(params.lastName),
         fechaNacimiento: new Date(params.fechaNacimiento),
         dni: Number(params.dni),
         address: params.address,
         userName: params.userName,
         telefono: params.telefono,
         pass: params.pass
       },
    });

    return {
      status: 200,
      success: true,
      data: usuario,
      errors: [],
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      data: [],
      errors: [errorGen, error.toString()],
    };
  } finally {
    await prisma.$disconnect();
  }
}

const update = async (params) =>{
  console.log(new Date().toUTCString() + " controllers/usuarioController.js -> update params = " + JSON.stringify(params))
  try {
    
    const errorsInParams = validacionCreateUpdate(params)
    if(errorsInParams.length){
      return{
        status: 500,
        success: false,
        data: [],
        errors: errorsInParams,
      }
    }
    
    const usuario = await prisma.sec_usuario.update({
      where: {
        id: parseInt(params.id),
      }, 
      data: {
        lastUpdate: new Date(),
        firstName: capitalizarString(params.firstName),
        lastName: capitalizarString(params.lastName),
        fechaNacimiento: new Date(params.fechaNacimiento),
        address: params.address,
        userName: params.userName,
        telefono: params.telefono,
        pass: params.pass
      },
    });

    return {
      status: 200,
      success: true,
      data: usuario,
      errors: [],
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      data: [],
      errors: [errorGen, error.toString()],
    };
  } finally {
    await prisma.$disconnect();
  }
}

const deleteById = async (id) =>{
  console.log(new Date().toUTCString() + " controllers/usuarioController.js -> deleteById  id = " + id)

  try {
    const usuario = await prisma.sec_usuario.delete({ where: { id: Number(id) } });

    return {
      status:200,
      success: true,
      data: usuario,
      errors: [],
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      data: [],
      errors: [errorGen, error.toString()],
    };
  } finally {
    await prisma.$disconnect();
  }
}

export default usuarioController;