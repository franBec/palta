import AvocadoLoading from "../layout/avocadoLoading"
import TablaRow from "./tablaRow";

const Tabla = ({ paltas, actions, permisos }) => {
  //* ----- diferentes estados de la tabla ----- 

  //la tabla tiene contenido para mostrar
  const tablaContenido = () =>{
    return(
      <table className="text-center table-fixed  bg-white rounded-xl shadow-md">
        <thead>
          <tr className="border-b  bg-lime-400 border-lime-500">
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 w-96"
            >
              ID.
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 w-96"
            >
              Nombre
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 w-96"
            >
              Orígen
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 w-96"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {paltas?.map((it) => (
            <TablaRow key={it.id} palta={it} permisos={permisos} actions={actions}/>
          ))}
        </tbody>
      </table>
    )
  }
  
  //la tabla está cargando
  const tablaCargando = () =>{
    return <AvocadoLoading />
  }

  //la tabla está vacia
  const tablaVacia = () =>{
    return <p className="text-center text-3xl font-bold">No hay paltas registradas</p>
  }
  
  const renderTableContent = () => {
    if(!paltas){
      return tablaCargando()
    }
    if(!paltas.length){
      return tablaVacia()
    }

    return tablaContenido()
  };

  return renderTableContent();
};

export default Tabla;
