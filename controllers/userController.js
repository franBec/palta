import prisma from "../db/prisma";
const errorGen =  process.env.ERRORGEN || "Algo salio mal, intente mas tarde"
const userController = async (params) => {
  
  console.log(new Date().toUTCString() + " controllers/paltaController.js -> params = " + JSON.stringify(params));

  switch (params.action) {
    case "login":
      return login(params);
    default:
      return methodNotFound()
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

export default userController;
