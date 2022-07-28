import { useState } from "react";

const ModalChildren = ({setShowModal, onSubmit, data, modo}) => {

  //* palta que ahora está en el form del modal
  const [paltaInfo, setPaltaInfo] = useState({
    id: data?.id ?? null,
    nombre: data?.nombre ?? "",
    origen: data?.origen ?? "",
  });

  //* handle cambios en el form del modal
  const handleChangeModalInputs = (e) => {
    const { name, value } = e.target;

    setPaltaInfo({
      ...paltaInfo,
      [name]: value,
    });
  };

  //* handle submit
  const handleSubmit = (e) =>{
    e.preventDefault();
    onSubmit.action(paltaInfo);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
        <div>
            <div>
                <label>Nombre:</label>
                <input
                className="ml-2 pl-1 border border-gray-500"
                type="text"
                value={paltaInfo.nombre ?? ""}
                readOnly={modo === 'lectura'}
                name="nombre"
                onChange={(e) => handleChangeModalInputs(e)}
                />
            </div>
            <div>
                <label>Origen:</label>
                <input
                className="ml-2 pl-1 border border-gray-500"
                value={paltaInfo.origen ?? ""}
                readOnly={modo === 'lectura'}
                name="origen"
                onChange={(e) => handleChangeModalInputs(e)}
                />
            </div>
        </div>
        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal({ display: false, modo: 'lectura' })}
            >
                Cerrar
            </button>

            {/* se oculta boton guardar/editar si el modal esta en modo lectura */}
            {
              modo !== 'lectura' &&
              <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
              >
                {modo === 'alta' ? <p>Guardar</p> : <p>Editar</p> }
              </button>
            }
        </div>
    </form>
  )
}

export default ModalChildren