import React from "react";
import { useRouter } from 'next/router'
import Footer from "./footer/footer.jsx"
//import Router from "next/router";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between">
      <header className="bg-lime-500 h-16">
        <ul className="flex flex-row justify-around h-full items-center">
          <div>
            <li className="text-white">Boton 1</li>
          </div>
          <div>
            <li className="text-white">
              <a href="/api/logout">
                <button className="my-3 bg-red-500 border border-red-800 p-2">
                  Log out
                </button>
              </a>
            </li>
          </div>
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
