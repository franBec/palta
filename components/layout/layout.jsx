import React from "react";
import { useRouter } from 'next/router'
import Footer from "./footer/footer.jsx"
import Link from "next/link.js";
import { useUsername } from "../../zustand/SessionStore";
//import Router from "next/router";

const Layout = ({ children }) => {
  const getUsername = useUsername((state) => state.get_username)

  return (
    <div className="flex flex-col justify-between">
      <header className="bg-lime-500 h-16">
        <ul className="flex flex-row justify-around h-full items-center">
          <div>
            <li className="text-white"><h1>{getUsername}</h1></li>
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
