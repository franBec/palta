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

export default paltaController;
