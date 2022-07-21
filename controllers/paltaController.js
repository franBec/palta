import prisma from "../db/prisma";

const paltaController = async (params) => {
  console.table(params);
  var resultados;

  switch (params.action) {
    case "findById":
      resultados = findById(params.id);
      return resultados;
    case "findAll":
      resultados = findAll();
      return resultados;
    case "create":
      resultados = create(params);
      return resultados;
  }
};

const findById = (id) => {
  console.log(id);
  return {
    success: true,
    data: [],
    errors: ["Algo salio muy mal en el servidor, intenta mas tarde"],
  };
};

const findAll = async () => {
  const data = await prisma.Palta.findMany();
  return {
    success: true,
    data: data,
    errors: [],
  };
};

const create = async (params) => {
  try {
    console.log("create: ",params)
    const palta = await prisma.Palta.create({
      data: {
        nombre:params.nombre,
        origen:params.origen
      },
    })
    return {
      success: true,
      data: palta,
      errors: [],
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      errors: ["Palta - create: Algo salio muy mal en el servidor, intenta mas tarde"],
    };
  }
};

export default paltaController;
