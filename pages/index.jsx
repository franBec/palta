import Tabla from "../components/mainMenu/tabla";
import useSWR from "swr";
import { useState } from "react";
import Modal from "../components/utils/modal";
import { GiAvocado } from "react-icons/gi";
import { withSessionSsr } from "../lib/session";

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
            className="bg-blue-500 text-white p-2 rounded-lg"
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

  const renderModal = (modo) => {
    return (
      <Modal
        setShowModal={setShowModal}
        modalTitle="Info de la palta 🥑"
        savePalta={savePalta}
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

export const getServerSideProps = withSessionSsr(async function({ req, res }) {
  const user = req.session.user;

  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: {user: req.session.user },
  };
});

