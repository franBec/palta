import { useEffect, useState } from "react";
import { useCurrentUser } from '../../zustand/SessionStore';

import TablaRow from "./tablaRow";

const Tabla = ({ data, actions }) => {

  //*obtengo permisos de la sessionStore de zustand
  const getPermisos = useCurrentUser((state) => state.get_permisosCurrentUser)

  //*proxy de los permisos
  const [statePermisos, setStatePermisos] = useState()
  useEffect(() => {
    setStatePermisos(getPermisos)
  },[getPermisos])

  const tablaContenido = () =>{
    return(
      <table className="text-center table-auto w-full  bg-white rounded-xl shadow-md">
        <thead>
          <tr className="border-b w-full bg-lime-400 border-lime-500">
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
          {data?.map((it) => (
            <TablaRow key={it.id} palta={it} permisos={statePermisos} actions={actions}/>
          ))}
        </tbody>
      </table>
    )
  }
  
  const tablaCargando = () =>{
    return <p className="text-5xl text-center">Cargando la tabla...</p>
  }
  
  const renderTableContent = () => {
    if(data){
      return tablaContenido()
    }
    return tablaCargando()
  };

  return renderTableContent();
};

export default Tabla;
