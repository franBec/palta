import AvocadoLoading from "../components/layout/avocadoLoading";
import useSWR from "swr";
import Router from "next/router";
import LoginComponent from "../components/login/loginComponent"
import { useCurrentUser } from '../zustand/SessionStore';
import ErrorComponent from "../components/utils/errorComponent";

const Login = () => {

  //*obtengo setters de la sessionStore de Zustand
  const setUser = useCurrentUser((state) => state.set_CurrentUser)
  const setPermisos = useCurrentUser((state) => state.set_permisosCurrentUser)

  //*fetcher de swr
  const fetchLogin = async (url) => {
    const res = await fetch(url);
    const resjson = await res.json();
    return resjson;
  };

  //*swr
  const { data, error, mutate } = useSWR(
    "/api/user/user",
    fetchLogin
  );

  //*action del boton login
  const login = async ({usuario,password}) => {
    try {

      //llamada al backend pora verificar credenciales
      const res = await fetch("api/auth", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          action: "login",
          usuario: usuario,
          password: password,
        }),
      });
      const resFromBackend = await res.json();


      if(!resFromBackend.success){
        //!credenciales invalidas
        alert('Credenciales incorrectas');  
      }
      else{

        //agrego a la sessionStore de zustand los datos recien obtenidos
        setUser(resFromBackend.data)
        setPermisos(resFromBackend.permisos)

        //refresco data declarada en swr
        //Ahora se supone que al hacer fetch, data.loggedIn debe volver true
        mutate("/api/user/user")

      }
    } catch (error) {
      alert(error.message);
    }
  };

  //*renderizado
  const renderMainContent = () => {
    
    //cargando....
    if (!data) {
      return (
        <AvocadoLoading />
      );
    }
    
    //algo salió mal
    if (error) {
      return <ErrorComponent message={'Algo malió sal'}/>;
    }

    //verificamos si debemos quedarnos en el log in o movernos a main menu
    if(data?.isLoggedIn){
      Router.push("/mainMenu")
    }else{
      return <LoginComponent handleLogin={login}/>
    }
  };

  //*return
  return (renderMainContent());
};

export default Login;
