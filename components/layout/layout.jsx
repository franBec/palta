import { useEffect, useState } from "react";
import Footer from "./footer/footer.jsx"
import Link from "next/link.js";
import Router from "next/router";
import { useCurrentUser } from '../../zustand/SessionStore';
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
              <li className="text-white"><h1>Bienvenido {stateUser?.lastName+" "}{stateUser?.userName}</h1></li>
          </div>
          <div>
              <li className="text-white">
                {/* <Link href="/api/logout">
                  <button className="my-3 bg-red-500 border border-red-800 p-2">
                    Log out
                  </button>
                </Link> */}
                <button className="my-3 bg-red-500 border border-red-800 p-2" onClick={handleLogout}>
                    Log out
                </button>
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
