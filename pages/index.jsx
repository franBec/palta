import { useState } from "react";
import { GiAvocado } from "react-icons/gi";
import useSWR from "swr";
import Router from "next/router";
import LoginComponent from "../components/login/loginComponent"

const Login = () => {
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
        <div>
          loading...
          <GiAvocado />
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
