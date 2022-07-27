import { useEffect, useState } from "react";
import { GiAvocado } from "react-icons/gi";
import useSWR from "swr";
import Router from "next/router";
import LoginComponent from "../components/login/loginComponent"
import { useCurrentUser } from '../zustand/SessionStore';

const Login = () => {
  const setUser = useCurrentUser((state) => state.set_CurrentUser)
  const setPermisos = useCurrentUser((state) => state.set_permisosCurrentUser)
  const [stateUser, setStateUser] = useState()
  const [statePermisos, setStatePermisos] = useState()

  useEffect(() => {
    setStateUser(setUser)
    setStatePermisos(setPermisos)
  },[setUser,setPermisos])

  const [paltaLogin, setPaltaLogin] = useState({
    usuario: "",
    password: ""
  });

  const fetchLogin = async (url) => {
    const res = await fetch(url);
    const resjson = await res.json();
    return resjson;
  };

  const { data, error, mutate } = useSWR(
    "/api/user/user",
    fetchLogin
  );

  const handleChangeLoginInputs = (e) => {
    const { name, value } = e.target;

    setPaltaLogin({
      ...paltaLogin,
      [name]: value,
    });
  };

  const login = async () => {
    try {
      const res = await fetch("api/auth", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          action: "login",
          usuario: paltaLogin.usuario,
          password: paltaLogin.password,
        }),
      });
      const resFromBackend = await res.json();
      if(!resFromBackend.success){
        console.log(resFromBackend);
      }else{
        setUser(resFromBackend.data)
        setPermisos(resFromBackend.permisos)
        //Muto el usuario así me re-renderiza el componente
        mutate(resFromBackend)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderMainContent = () => {
    if (!data) {
      return (
        <div role="status">
          <svg aria-hidden="true" className="flex justify-center text-lime-500 items-center mr-2 w-8 h-8 animate-spin " viewBox="0 0 50 50" style={{width: "150px", height: "150px"}}>
            <GiAvocado />
          </svg>
      </div>
      );
    }
    
    if (error) {
      return <div>failed to load</div>;
    }

    if(data?.isLoggedIn){
      Router.push("/mainMenu")
    }else{
      return <LoginComponent useHandleChangeLoginInputs={handleChangeLoginInputs} useLogin={login}/>
    }
  };

  return (
    <>
      {renderMainContent()}
    </>
  );
};

export default Login;
