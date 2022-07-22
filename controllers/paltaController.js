import prisma from "../db/prisma";
const errorGen =  process.env.ERRORGEN || "Algo salio mal, intente mas tarde"
const paltaController = async (params) => {

  console.log(new Date().toUTCString() + " controllers/paltaController.js -> params = " + JSON.stringify(params));

  switch (params.action) {
    case "findById":
      return findById(params.id);
    case "findAll":
      return findAll(params);
    case "create":
      return create(params);
    case "deleteById":
      return deleteById(params.id);
    case "update":
      return update(params);
    case "login":
      return login(params);
    default:
      return methodNotFound()
  }
};

//CRUD Paltas
const findById = (id) => {
  console.log(new Date().toUTCString() + " controllers/paltaController.js -> findById  id= " + id);

  return {
    status: 500,
    success: false,
    data: [],
    errors: ["en desarrollo"],
  };
};

const findAll = async (params) => {
  try {
    const page = Number(params.page) || 1
    const data = await prisma.Palta.findMany({
      skip: 10 * ( page - 1 ),
      take: 10
    });

    const count = await prisma.Palta.count()

    return {
      status: data? 200:404,
      success: true,
      data: data,
      errors: [],
      metadata: {
        total: count,
        page: page,
        totalPages: Math.ceil(count / 10)
      }
    };
  } catch (error) {
    return {
      status: 500,
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
      status: 200,
      success: true,
      data: palta,
      errors: [],
    };
  } catch (error) {
    return {
      status: 500,
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
      status:200,
      success: true,
      data: deletePalta,
      errors: [],
    };
  } catch (error) {
    return {
      status: 500,
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
      status: 200,
      success: true,
      data: response,
      errors: [],
    };

  } catch (error) {
    return {
      status: 500,
      success: false,
      data: [],
      errors: [errorGen, error.toString()],
    };
  }
};

//LOGIN Paltas
const login = async (params) => {
  try {
    const user = await prisma.User.findUnique({
      where: {
        email: params.usuario
      },
    });
    console.log("login - User: ",user)
    if(user){
      if(!(user.name === params.password)){
        return {
          success: false,
          data: []
        };
      }
      return {
        success: true,
        data: user,
        errors: [],
      };
    }else{
      return {
        success: false,
        data: []
      };
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      errors: [
        "Palta - login: Algo salio muy mal en el servidor, intenta mas tarde",
        error
      ],
    };
  }
};

const methodNotFound = () => (
  {
    status: 400,
    success: false,
    data: {},
    errors: [new Date().toUTCString() + ' controllers/paltaController.js ->  method Not Found'],
  }
)

export default paltaController;
