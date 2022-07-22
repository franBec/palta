import Image from "next/image";
import Link from "next/link";

const Login = () => {
  const imgSource = "/paltalogo.png";
  return (
    <>
      <div className="drop-shadow-xl rounded-lg bg-gradient-to-r from-white to-lime-500 flex justify-center items-center p-10">
        <div className="">
          <Image
            src={imgSource}
            alt="Picture of the palta"
            width={200}
            height={200}
          />
        </div>
        <div className="px-10 flex flex-col justify-center">
          <input
            type="text"
            placeholder="Usuario"
            className="p-1 mb-1 border border-lime-500"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className=" p-1 mt-1 border border-lime-500"
          />
          <button className="mt-5 bg-lime-500 border border-gray-500 p-2">
            <Link href="/mainMenu">Iniciar sesion</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
