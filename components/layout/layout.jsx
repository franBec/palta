import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen justify-between">
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
      <main className="p-2">{children}</main>
      <footer className="bg-lime-500 h-10">Copyright Palta project 2022</footer>
    </div>
  );
};

export default Layout;
