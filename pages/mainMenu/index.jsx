import Tabla from "../../components/mainMenu/tabla";
import useSWR from "swr";
import { useState } from "react";
import Modal from "../../components/utils/modal";
import { GiAvocado } from "react-icons/gi";

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

  const renderMainContent = () => {
    if (!data) {
      return (
        <div>
          loading...
          <GiAvocado />
        </div>
      );
    }

    if (error) {
      return <div>failed to load</div>;
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
    //agregar controles si todo salio bien
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
