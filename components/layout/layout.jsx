import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <p>navbar</p>
      {children}
      <p>footer</p>
    </>
  );
};

export default Layout;
