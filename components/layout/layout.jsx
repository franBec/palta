import React from "react";
import Footer from "./footer/footer.jsx"

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between">
      <header className="bg-lime-500 h-16">
        <ul className="flex flex-row justify-around h-full items-center">
          <div>
            <li className="text-white">Boton 1</li>
          </div>
          <div>
            <li className="text-white">Boton 2</li>
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
