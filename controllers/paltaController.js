import prisma from "../db/prisma";
const errorGen =  process.env.ERRORGEN || "Algo salio mal, intente mas tarde"
const paltaController = async (params) => {
  
  console.log(new Date().toUTCString() + " controllers/paltaController.js -> params = " + JSON.stringify(params));

  switch (params.action) {
    case "findById":
      return findById(params.id);
    case "findAll":
      return findAll();
    case "create":
      return create(params);
    case "deleteById":
      return deleteById(params.id);
    case "update":
      return update(params);
    default:
      return methodNotFound()
  }
};

const findById = (id) => {
  console.log(new Date().toUTCString() + " controllers/paltaController.js -> findById  id= " + id);

  return {
    success: false,
    data: [],
    errors: ["en desarrollo"],
  };
};

const findAll = async () => {
  try {
    const data = await prisma.Palta.findMany();

    return {
      success: true,
      data: data,
      errors: [],
    };
  } catch (error) {
    return {
      success: false,
      data: data,
      errors: [errorGen, error.toString()],
    };
  }
};

const create = async (params) => {
  console.log(new Date().toUTCString() + " controllers/paltaController.js -> create  params = " + JSON.stringify(params))
  try {
    const palta = await prisma.Palta.create({
      data: {
        nombre: params.nombre,
        origen: params.origen,
      },
    });
    return {
      success: true,
      data: palta,
      errors: [],
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      errors: [errorGen,error.toString()],
    };
  }
};

const deleteById = async (id) => {
  console.log(new Date().toUTCString() + " controllers/paltaController.js -> deleteById  id = " + id)

  try {
    const deletePalta = await prisma.Palta.delete({ where: { id: id } });

    return {
      success: true,
      data: deletePalta,
      errors: [],
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      errors: [errorGen, error.toString()],
    };
  }
};

const update = async (params) => {
  console.log(new Date().toUTCString() + " controllers/paltaController.js -> update params = " + JSON.stringify(params))

  try {
    const response = await prisma.Palta.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        nombre: params.nombre,
        origen: params.origen,
      },
    });

    return {
      success: true,
      data: response,
      errors: [],
    };

  } catch (error) {
    return {
      success: false,
      data: [],
      errors: [errorGen, error.toString()],
    };
  }
};

const methodNotFound = () => (
  {
    success: false,
    data: {},
    errors: [new Date().toUTCString() + ' controllers/paltaController.js ->  method Not Found'],
  }
)

export default paltaController;
