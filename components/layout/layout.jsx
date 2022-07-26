import React from "react";
import { useRouter } from 'next/router'
import Footer from "./footer/footer.jsx"
import Link from "next/link.js";
import { useCurrentUser } from '../../zustand/SessionStore';
//import Router from "next/router";

const Layout = ({ children }) => {
  const getUser = useCurrentUser((state) => state.get_CurrentUser)
  const getRoles = useCurrentUser((state) => state.get_rolsCurrentUser)

  const logout = () =>{
    if(getUser){
      return(
        <>
          <div>
              <li className="text-white"><h1>Bienvenido {getUser?.lastName+" "}{getUser?.userName}</h1></li>
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
          {getRoles?.map((it) => (
            <div key={it.id}>
              <li className="text-white">
                <h1>{it?.nombre+" "+it.description}</h1>
              </li>
              {it?.permisos.map((ti) => (
                <p>{ti?.nombre}</p>
              ))}
            </div>
          ))}
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
