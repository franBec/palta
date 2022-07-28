import LoadingBloqueante from "../utils/loadingBloqueante";
import Footer from "./footer"
import Header from "./header";

const Layout = ({ children }) => {

  return (
    <>
      <div className="flex flex-col h-full justify-between bg-slate-800 bg-opacity-80">
        
        {/* contenido de la barra de arriba */}
        <div>
          <Header/>
        </div>

        {/* contenido principal */}
        <div>
          <main className="p-2 lg:h-screen md:h-max flex justify-center items-center">{children}</main>
        </div>

        {/* contenido del final de la pagina */}
        <div>
          <Footer />
        </div>
        
      </div>
      
      {/* animación bloqueante cuando algo importante esta pasando */}
      <LoadingBloqueante/>
    </>
  );
};

export default Layout;
