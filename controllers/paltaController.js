import prisma from "../db/prisma";

const paltaController = async (params) => {
  console.log(
    new Date().toUTCString() +
      " controllers/paltaController.js -> params = " +
      params
  );

  console.log("Params.action es: " + params.action);

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
      console.log(
        new Date().toUTCString() +
          " controllers/paltaController.js -> Action no válido!"
      );
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
    console.log("create: ", params);
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
      errors: [
        "Palta - create: Algo salio muy mal en el servidor, intenta mas tarde",
      ],
    };
  }
};

const deleteById = async (id) => {
  console.log("entroo");

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
      errors: [error],
    };
  }
};

const update = async (params) => {
  console.log("my params ");
  console.table(params);
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
    console.log("my response ");
    console.table(response);
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: [],
      errors: ["Algo salio muy mal en el servidor, intenta mas tarde", error],
    };
  }

  return {
    success: true,
    data: [],
    errors: [],
  };
};

export default paltaController;
