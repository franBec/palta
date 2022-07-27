import { useEffect, useState } from "react";
import { useCurrentUser } from '../../zustand/SessionStore';

const Tabla = ({ data, setPaltaInfo, setShowModal, deletePalta }) => {

  const getPermisos = useCurrentUser((state) => state.get_permisosCurrentUser)
  const [statePermisos, setStatePermisos] = useState()

  useEffect(() => {
    setStatePermisos(getPermisos)
  },[getPermisos])


  const handleVerMasClick = (i) => {
    setPaltaInfo(data[i]);
    setShowModal({ display: true, modo: "lectura" });
  };

  const handleEliminarClick = (i) => {
    deletePalta(i)
  };
  
  const handleEditarClick = (i) => {
    setPaltaInfo(data[i]);
    setShowModal({ display: true, modo: "editar" });
  }

  const renderTable = () => {
    return (
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
         {data?.map((it, i) => (
           <tr key={i} className="border-b bg-green-100 border-green-200">
             <td className="text-sm text-gray-900 font-medium  py-4 whitespace-nowrap">
               {it.id ?? "-"}
             </td>
             <td className="text-sm text-gray-900 font-medium  py-4 whitespace-nowrap">
               {it.nombre ?? "-"}
             </td>
             <td className="text-sm text-gray-900 font-medium  py-4 whitespace-nowrap">
               {it.origen ?? "-"}
             </td>
             <td>
               <button
                 onClick={() => handleVerMasClick(i)}
                 className="border-2 border-blue-300 hover:bg-blue-500 hover:text-white p-3 rounded-md"
               >
                 Detalles
               </button>
               { statePermisos?.some(it => it.nombre === "PALTA_EDIT_BUTTON") &&
                 <button className="border-2 ml-2 border-yellow-300 hover:bg-yellow-500 hover:text-white px-5 py-3 rounded-md" onClick={() => handleEditarClick(i)}>
                   Editar
                 </button>

               } 

              { statePermisos?.some(it => it.nombre === "PALTA_DELETE_BUTTON") &&
               <button className="ml-2 border-2 border-red-400 rounded-md p-3 hover:bg-red-400 hover:text-white" onClick={() => handleEliminarClick(it.id)}>
                 Eliminar
               </button>
              }
             </td>
           </tr>
         ))}
       </tbody>
     </table>
    );
  };

  return renderTable();
};

export default Tabla;
