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

  const validarInputs = () => {
    if(paltaInfo.nombre.length > 30 || paltaInfo.nombre.length == 0){
      return "Nombre debe ser menor a 30 caracteres y no estar vacio"
    }
    if(paltaInfo.origen.length > 30 || paltaInfo.origen.length == 0){
      return"Origen debe ser menor a 30 caracteres y no estar vacio"
    }
    return false;
  }

  //* handle submit
  const handleSubmit = (e) =>{
  
    e.preventDefault();
    var msj = validarInputs()
    if(msj){
      swal(msj, {
        icon: "warning",
        button: false,
      });
      return
    }

    onSubmit.action(paltaInfo);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
        <div>
            <div>
                <label>Nombre:</label>
                <input
                className="ml-2 pl-1 border-2 border-black rounded mb-2"
                type="text"
                value={paltaInfo.nombre ?? ""}
                readOnly={modo === 'lectura'}
                required
                name="nombre"
                onChange={(e) => handleChangeModalInputs(e)}
                />
            </div>
            <div>
                <label className="mr-2">Origen:</label>
                <input
                className="ml-2 pl-1 border-2 border-black rounded mb-2"
                value={paltaInfo.origen ?? ""}
                required
                readOnly={modo === 'lectura'}
                name="origen"
                onChange={(e) => handleChangeModalInputs(e)}
                />
            </div>
        </div>
        <div className="flex items-center justify-center border-t border-solid border-slate-200 rounded-b">
            <button
                className="text-red-500 background-transparent font-bold uppercase text-sm mt-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal({ display: false, modo: 'lectura' })}
            >
                Cerrar
            </button>

            {/* se oculta boton guardar/editar si el modal esta en modo lectura */}
            {
              modo !== 'lectura' &&
              <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold p-2 mt-2 rounded uppercase text-smrounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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