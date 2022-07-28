import { BsFillPencilFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { CgDetailsMore } from "react-icons/cg";

const TablaRow = ({palta, permisos, actions}) => {
  return (
    <tr className="border-b bg-green-100 border-green-200">

        {/* palta.id */}
        <td className="text-sm text-gray-900 font-medium  py-4 whitespace-nowrap">
            {palta.id ?? "-"}
        </td>

        {/* palta.nombre */}
        <td className="text-sm text-gray-900 font-medium  py-4 whitespace-nowrap">
            {palta.nombre ?? "-"}
        </td>

        {/* palta.origen */}
        <td className="text-sm text-gray-900 font-medium  py-4 whitespace-nowrap">
            {palta.origen ?? "-"}
        </td>

        {/* palta.acciones */}
        <td>

            {/* ver Detalles - no requiere permisos */}
            <button
                onClick={() => actions.handleVerDetallesPalta(palta.id)}
                className="border-2 text-lg border-blue-300 hover:bg-blue-500 text-blue-700 hover:text-white p-3 rounded-md">
                  <CgDetailsMore />
            </button>
            
            {/* editar - requiere permiso PALTA_EDIT_BUTTON */}
            { permisos?.some(it => it.nombre === "PALTA_EDIT_BUTTON") &&
                <button 
                    onClick={() => actions.handleEditarPalta(palta.id)}
                    className="text-lg border-2 ml-2 border-yellow-300 hover:bg-yellow-500 text-yellow-600 hover:text-white rounded-md p-3">
                   <BsFillPencilFill />
                </button>

            } 

            {/* eliminar - requiere permiso PALTA_DELETE_BUTTON */}
            { permisos?.some(it => it.nombre === "PALTA_DELETE_BUTTON") &&
            <button 
                onClick={() => actions.handleEliminarPalta (palta.id)}
                className="text-lg border-2 ml-2 border-red-400 text-red-700  hover:bg-red-400 hover:text-white rounded-md p-3">
                 <TiDelete />
            </button>
            }

        </td>
    </tr>
  )
}

export default TablaRow