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
                className="border-2 border-blue-300 hover:bg-blue-500 hover:text-white p-3 rounded-md"
            >
                Detalles
            </button>
            
            {/* editar - requiere permiso PALTA_EDIT_BUTTON */}
            { permisos?.some(it => it.nombre === "PALTA_EDIT_BUTTON") &&
                <button 
                    onClick={() => actions.handleEditarPalta(palta.id)}
                    className="border-2 ml-2 border-yellow-300 hover:bg-yellow-500 hover:text-white px-5 py-3 rounded-md"
                >
                    Editar
                </button>

            } 

            {/* eliminar - requiere permiso PALTA_DELETE_BUTTON */}
            { permisos?.some(it => it.nombre === "PALTA_DELETE_BUTTON") &&
            <button 
                onClick={() => actions.handleEliminarPalta (palta.id)}
                className="ml-2 border-2 border-red-400 rounded-md p-3 hover:bg-red-400 hover:text-white" 
            >
                Eliminar
            </button>
            }

        </td>
    </tr>
  )
}

export default TablaRow