import Image from 'next/image';
import { useState } from "react";

const LoginComponent = ({handleLogin}) => {
    const [paltaLogin, setPaltaLogin] = useState({
      usuario: "",
      password: ""
    });

    const handleIniciarSesion = () =>{
      handleLogin(paltaLogin)
    }

    const handleChangeLoginInputs = (e) => {
      const { name, value } = e.target;

      setPaltaLogin({
        ...paltaLogin,
        [name]: value,
      });
    };

    return (
        <>
          <div className="drop-shadow-xl rounded-lg bg-gradient-to-r from-white to-lime-500 flex justify-center items-center p-10">
            <div className="">
              <Image
                src={"/paltalogo.png"}
                alt="Picture of the palta"
                width={200}
                height={200}
              />
            </div>
            <div className="px-10 flex flex-col justify-center">
              <input
                type="text"
                placeholder="Usuario"
                name="usuario"
                className="p-1 mb-1 border border-lime-500"
                onChange={(e) => handleChangeLoginInputs(e)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                name="password"
                className=" p-1 mt-1 border border-lime-500"
                onChange={(e) => handleChangeLoginInputs(e)}
              />
              <button className="mt-5 bg-lime-500 border border-gray-500 p-2"
               onClick={handleIniciarSesion}>
                {/* <Link href="/mainMenu">Iniciar sesion</Link> */}
                Iniciar sesion
              </button>
            </div>
          </div>
        </>
    );
}

export default LoginComponent