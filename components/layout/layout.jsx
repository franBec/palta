import { useEffect, useState } from "react";
import Footer from "./footer/footer.jsx"
import Link from "next/link.js";
import { useCurrentUser } from '../../zustand/SessionStore';
//import Router from "next/router";

const Layout = ({ children }) => {
  const getUser = useCurrentUser((state) => state.get_CurrentUser)
  const getPermisos = useCurrentUser((state) => state.get_permisosCurrentUser)
  const [stateUser, setStateUser] = useState()
  const [statePermisos, setStatePermisos] = useState()

  useEffect(() => {
    setStateUser(getUser)
    setStatePermisos(getPermisos)
  },[getUser,getPermisos])


  const logout = () =>{
    if(stateUser){
      return(
        <>
          <div>
              <li className="text-white"><h1>Bienvenido {stateUser?.lastName+" "}{stateUser?.userName}</h1></li>
          </div>
          <div>
              <li className="text-white">
                <Link href="/api/logout">
                  <button className="my-3 bg-red-500 border border-red-800 p-2">
                    Log out
                  </button>
                </Link>
              </li>
          </div>
          
        </>
      )
    }
  }

  return (
    <div className="flex flex-col justify-between">
      <header className="bg-lime-500 h-16">
        <ul className="flex flex-row justify-around h-full items-center">
          {logout()}
        </ul>
      </header>
      <main className="p-2 h-screen flex justify-center items-center">{children}</main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
