import Image from 'next/image';
import { useState } from "react";
import Router from "next/router";

const LoginComponent = ({handleLogin}) => {
    
  //*state del formulario de login
  const [paltaLogin, setPaltaLogin] = useState({
      usuario: "",
      password: ""
    });

  //* handle los cambios en el formulario de login
  const handleChangeLoginInputs = (e) => {
    const { name, value } = e.target;

    setPaltaLogin({
      ...paltaLogin,
      [name]: value,
    });
  };
  
  //*handle submit
  const handleIniciarSesion = (e) =>{
    e.preventDefault()
    handleLogin(paltaLogin)
  }
  //*handle register
  const handleRegister = (e) =>{
    e.preventDefault()
    Router.push("/register")
  }

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className="login-container flex justify-center rounded-full items-center p-10 ">
        <div className="login-container-logo shadow-xl drop- rounded-full bg-gradient-to-r from-lime-100 to-lime-500 w-1/4 h-1/5 border-4 border-white flex justify-center items-center">
          <Image src={"/paltalogo.png"} alt="Picture of the palta" width={200} height={100}/>
        </div>
        <div className='colorFullPalta shadow-xl bg-gradient-to-r from-lime-300 to-lime-500 '></div>
        <form className="login-container-inputs px-10 flex flex-col justify-center " onSubmit={(e) => handleIniciarSesion(e)}>
          <input type="text" placeholder="Usuario" name="usuario" className=" mb-1 palta-input" onChange={(e) => handleChangeLoginInputs(e)} />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            className=" mb-1 palta-input"
            onChange={(e) => handleChangeLoginInputs(e)}
          />
          <button type="submit" className="palta-button mt-5 bg-blue-300 hover:text-white ">
            Iniciar sesión
          </button>
          <button className="palta-button mt-2 bg-white hover:text-white hover:bg-lime-500" onClick={(e) => handleRegister(e)}>
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginComponent