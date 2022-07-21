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
    case "deleteById":
      resultados = deleteById(params.id);
      return resultados;
    case "update":
      resultados = update(params);
      return resultados;
  }
};

const findById = (id) => {
  console.log(id);
  return {
    succcess: true,
    data: [],
    errors: ["Algo salio muy mal en el servidor, intenta mas tarde"],
  };
};

const findAll = async () => {
  const data = await prisma.Palta.findMany();
  return {
    succcess: true,
    data: data,
    errors: [],
  };
};

const deleteById = async (id) => {

  console.log("entroo")

  try {
    const deletePalta = await prisma.Palta.delete({ where: { id: id,}, })

    return {
      succcess: true,
      data: deletePalta,
      errors: [],
    };
  } catch (error) {
    return {
      succcess: false,
      data: [],
      errors: [error],
    };
  }
};

const update = async (params) => {
  console.log("my params ")
  console.table(params)
  try{
    const response = await prisma.Palta.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        nombre: params.nombre,
        origen: params.origen,
      },
    })
    console.log("my response ")
    console.table(response)
  }catch(error){
    console.error(error)
    return {
      succcess: false,
      data: [],
      errors: ["Algo salio muy mal en el servidor, intenta mas tarde", error],
    };
  }

  return {
    succcess: true,
    data: [],
    errors: [],
  };
};

export default paltaController;
