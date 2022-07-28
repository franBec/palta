import { useEffect, useState } from "react";
import Footer from "./footer/footer.jsx"
import Link from "next/link";
import Router from "next/router";
import { useCurrentUser } from '../../zustand/SessionStore';
import { AiOutlinePoweroff } from "react-icons/ai";
import Image from 'next/image';
//import Router from "next/router";

const Layout = ({ children }) => {
  const getUser = useCurrentUser((state) => state.get_CurrentUser)
  const getPermisos = useCurrentUser((state) => state.get_permisosCurrentUser)
  const setUser = useCurrentUser((state) => state.set_CurrentUser)
  const setPermisos = useCurrentUser((state) => state.set_permisosCurrentUser)
  const [stateUser, setStateUser] = useState()
  const [statePermisos, setStatePermisos] = useState()

  useEffect(() => {
    setStateUser(getUser)
    setStatePermisos(getPermisos)
  },[getUser,getPermisos])

  // const handleLogout = async () => {
  //   try {
  //     const res = await fetch("api/logout");
  //     const resFromBackend = await res.json();
  //   } catch (error) {
  //     console.log(error)
  //   }finally{
  //     setUser(null)
  //     setPermisos(null)
  //     Router.push("/")
  //   }
  // }

  const handleLogout = async () => {
    setUser(null)
    setPermisos(null)
  }

  const logout = () =>{
    if(stateUser){
      return(
        <>
          <div>
            <li className="text-white flex justify-center items-center">
                <Image
                  src={"/userAnon.jfif"}
                  alt="Picture of the palta"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <h1 className="ml-2">Bienvenido {stateUser?.lastName+" "}{stateUser?.userName}</h1>
             </li>
          </div>
          <div>
              <li className="text-white">
                <Link href="/api/logout">
                  <button className="rounded flex justify-center items-center border-2 my-3 bg-red-500 border-red-800 p-2" onClick={handleLogout}>
                  <AiOutlinePoweroff /> <span className="pl-2">Log out </span>
                  </button>
                </Link>
                {/* <button className="my-3 bg-red-500 border border-red-800 p-2" onClick={handleLogout}>
                    Log out
                </button> */}
              </li>
          </div>
          
        </>
      )
    }
  }

  return (
    <div className="flex flex-col h-full justify-between">
      <header className="bg-lime-500 h-16">
        <ul className="flex flex-row justify-around h-full items-center">
          {logout()}
        </ul>
      </header>
      <main className="p-2 lg:h-screen md:h-max flex justify-center items-center">{children}</main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
