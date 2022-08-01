import prisma from "../db/prisma";
const loginController = async (params) => {
  
  console.log(new Date().toUTCString() + " controllers/paltaController.js -> params = " + JSON.stringify(params));
  console.log(params)
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
      const user = await prisma.sec_usuario.findUnique({
        where: {
          email: params.usuario
        },
        include: {
          roles:{include: {
            permisos: true,
          }}
        },
      });

      if(user && user.pass === params.password){
        var permisosList = []

        if(user?.roles){
          user?.roles.forEach(it=>{
            if(it?.permisos){
              it?.permisos.forEach(pms=>{
                if(! permisosList.some(it=> it.id === pms.id)){
                  permisosList.push(pms)
                }
              })
            }
          })
        }

        return {
          success: true,
          data: {...user, permisos: permisosList},
          errors: [],
        };

      }
      
      return {
        success: false,
        data: [],
        errors: ['Credenciales inválidas']
      };
      
    } catch (error) {
      return {
        success: false,
        data: [],
        errors: [
          "Palta - login: Algo salio muy mal en el servidor, intenta mas tarde",
          error.message
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

export default loginController;
