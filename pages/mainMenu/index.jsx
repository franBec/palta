import Tabla from "../../components/mainMenu/tabla";
import useSWR from "swr";
import { useState } from "react";
import Modal from "../../components/utils/modal";
import { GiAvocado } from "react-icons/gi";
import ShowMsj from "../../components/layout/showMsj/showMsj";

const index = () => {
  //*contenido principal

  const fetchPaltas = async (url) => {
    const res = await fetch(url);
    const resjson = await res.json();
    return resjson;
  };

  const { data, error, mutate } = useSWR(
    "api/palta?action=findAll",
    fetchPaltas
  );

  //error stuff
  const [msjContent, setMsjContent] = useState("")
  const [isHidden, setisHidden] = useState(true)
  const [isError, setisError] = useState(true)

  const renderMainContent = () => {
    if (!data) {
      return (
        <div role="status">
          <svg aria-hidden="true" className="flex justify-center text-lime-500 items-center mr-2 w-8 h-8 animate-spin " viewBox="0 0 50 50" style={{width: "150px", height: "150px"}}>
            <GiAvocado />
          </svg>
      </div>
      );
    }

    if (error) {
      setMsjContent(error.toString())
      setisHidden(false)
      setisError(true)
    }

    return (
      <div className="flex flex-col">
        <div className="flex justify-start my-2">
          <button
            className="border-2 border-lime-300 bg-lime-200 hover:bg-lime-400 p-2  rounded-lg"
            onClick={handleClickBotonAgregar}
          >
            Agregar
            <GiAvocado className="ml-2 text-3xl text-white inline" />
          </button>
        </div>
        <div>
          <Tabla
            data={data.data}
            setPaltaInfo={setPaltaInfo}
            setShowModal={setShowModal}
            deletePalta={deletePalta}
          />
        </div>
        <ShowMsj isHidden={isHidden} setisHidden={setisHidden} isError={isError}>
          {msjContent}
        </ShowMsj>
      </div>
    );
  };

  //*modal
  const [showModal, setShowModal] = useState({
    display: false,
    modo: "lectura",
  });
  const [paltaInfo, setPaltaInfo] = useState({
    id: null,
    nombre: "",
    origen: "",
  });

  const handleChangeModalInputs = (e) => {
    const { name, value } = e.target;

    setPaltaInfo({
      ...paltaInfo,
      [name]: value,
    });
  };

  const savePalta = async () => {
    const res = await fetch("api/palta", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        action: "create",
        nombre: paltaInfo.nombre,
        origen: paltaInfo.origen,
      }),
    });

    const resFromBackend = await res.json();
    console.log(resFromBackend);

    //control si falla
    if(!resFromBackend?.success){
      setMsjContent(resFromBackend.errors[0].toString())
      resFromBackend.errors.map((error) => {
        console.log("ERROR - savePalta - " + error)
      })
      setisHidden(false)
      setisError(true)
    }else{ //control si todo ok
      setMsjContent("Palta creada exitosamente!")
      setisHidden(false)
      setisError(false)
    }

    setShowModal({ display: false, modo: "lectura" });
    mutate("api/palta?action=findAll");
  };

  const deletePalta = async (id) => {

    console.log(paltaInfo)

    const res = await fetch("api/palta", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        action: "delete",
        id: id,
      }),
    });

    const resFromBackend = await res.json();
    console.log(resFromBackend);
    //agregar controles si todo salio bien
    mutate("api/palta?action=findAll");
  }

  const editPalta = async () => {
    
    const res = await fetch("api/palta", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        action: "update",
        id: paltaInfo.id,
        nombre: paltaInfo.nombre,
        origen: paltaInfo.origen,
      }),
    });

    const resFromBackend = await res.json();
    console.log(resFromBackend);
    //agregar controles si todo salio bien
    setShowModal({display: false, modo: "lectura"})
    mutate("api/palta?action=findAll");
  }

  const renderModal = (modo) => {
    return (
      <Modal
        setShowModal={setShowModal}
        modalTitle="Info de la palta 🥑"
      >
        <>
          <div>
            <div>
              <label>Nombre:</label>
              <input
                className="ml-2 pl-1 border border-gray-500"
                type="text"
                value={paltaInfo.nombre ?? ""}
                readOnly={modo === "lectura"}
                name="nombre"
                onChange={(e) => handleChangeModalInputs(e)}
              />
            </div>
            <div>
              <label>Origen:</label>
              <input
                className="ml-2 pl-1 border border-gray-500"
                value={paltaInfo.origen ?? ""}
                readOnly={modo === "lectura"}
                name="origen"
                onChange={(e) => handleChangeModalInputs(e)}
              />
            </div>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() =>
                setShowModal({ display: false, modo: "lectura" })
              }
            >
              Close
            </button>
            {showModal.modo === "alta" && (<button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => savePalta()}
            >
              Save Changes
            </button>)}
            {showModal.modo === "editar" && (<button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => editPalta()}
            >
              EDITAR
            </button>)}
          </div>
        </>
      </Modal>
    );
  };

  const handleClickBotonAgregar = () => {
    setPaltaInfo({ id: null, nombre: "", origen: "" });
    setShowModal({ display: true, modo: "alta" });
  };

  return (
    <>
      <div className="flex justify-center items-center">
        {renderMainContent()}
      </div>
      {showModal.display && renderModal(showModal.modo)}
    </>
  );
};

export default index;
