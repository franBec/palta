import Tabla from "../../components/mainMenu/tabla";
import useSWR from "swr";
import Modal from "../../components/utils/modal";
import { GiAvocado } from "react-icons/gi";
import ShowMsj from "../../components/layout/showMsj/showMsj";
import PaginateNavbar from "../../components/utils/pagination/paginateNavbar";
import { withSessionSsr } from "../../lib/session";
import { useEffect, useState } from "react";
import { useCurrentUser } from '../../zustand/SessionStore';
import ModalChildren from "../../components/mainMenu/modalChildren";

import swal from "sweetalert"
;
const Index = () => {

  //*permisos obtenidos en tiempo de login. Se encuentran en una store de zustand
  const getPermisos = useCurrentUser((state) => state.get_permisosCurrentUser)
  
  //*proxy de los permisos, necesario para evitar rehydration error
  const [statePermisos, setStatePermisos] = useState()
  useEffect(() => {
    setStatePermisos(getPermisos)
  },[getPermisos])

  //*pagination
  const [currentPage, updateCurrentPage] = useState(1);
  const shouldUpdatePageNumber = (number) => {
    if (
      number > 0 &&
      number <= data?.metadata?.totalPages &&
      number != currentPage
    ) {
      updateCurrentPage(number);
    }
  };

  //*fetcher del swr
  const fetchPaltas = async (url) => {
    const res = await fetch(url);
    const resjson = await res.json();
    return resjson;
  };

  //*swr
  const { data, error, mutate } = useSWR(
    `api/palta?action=findAll&page=${currentPage}`,
    fetchPaltas
  );

  //* modal stuff
  const [showModal, setShowModal] = useState({display: false, modo: 'lectura'});
  const [paltaEnElModal, setPaltaEnElModal] = useState(null);
  const [submitDelModal, setSubmitDelModal] = useState(null);

  //* swal stuff
  const callSwal = (success, text) => {
    //cartel de éxito
    if(success){
      swal(text, {
        icon: "success",
      });
    }

    //cartel de error
    else{      
      swal(text, {
        icon: "error",
      });
    }
  }  

  //* ----- ABM de palta - HANDLE CLICK EN BOTONES ------

  const handleAgregarPalta = () => {
    setPaltaEnElModal(null);
    setSubmitDelModal({ action: savePalta });
    setShowModal({display: true, modo: 'alta'});
  }

  const handleEditarPalta = (id) => {
    setPaltaEnElModal(data.data.filter((it) => it.id === id)[0]);
    setSubmitDelModal({ action: editPalta });
    setShowModal({display: true, modo: 'editar'});
  }

  const handleEliminarPalta = (id) =>{
    swal({
      title: "¿Estás seguro?",
      text: "Una vez eliminada la palta, no se puede recuperar",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        deletePalta(id)
      }
    });
  }

  const handleVerDetallesPalta = (id) => {
    setPaltaEnElModal(data.data.filter((it) => it.id === id)[0]);
    setSubmitDelModal({ action: editPalta });
    setShowModal({display: true, modo: 'lectura'});
  }


  //* ------ ABM de palta - ACCIONES ------

  //*Alta
  const savePalta = async (form) => {
    setShowModal({ display: false, modo: "lectura" });

    const res = await fetch("api/palta", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        action: "create",
        nombre: form.nombre,
        origen: form.origen,
      }),    
    });
    

    const resFromBackend = await res.json();
    callSwal(resFromBackend.success, resFromBackend.success ? 'Palta agregada exitosamente':'Algo salió mal...')
    updateCurrentPage(1)
    mutate(`api/palta?action=findAll&page=${currentPage}`);
  };

  //*Baja
  const deletePalta = async (id) => {
    const res = await fetch("api/palta", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        action: "deleteById",
        id: id,
      }),
    });
    
    callSwal(resFromBackend.success, resFromBackend.success ? 'Palta eliminada exitosamente':'Algo salió mal...')
    const resFromBackend = await res.json();
    updateCurrentPage(1)
    mutate(`api/palta?action=findAll&page=${currentPage}`);
  }

  //*Modificar
  const editPalta = async (form) => {
    setShowModal({display: false, modo: "lectura"})

    const res = await fetch("api/palta", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        action: "update",
        id: form.id,
        nombre: form.nombre,
        origen: form.origen,
      }),
    });


    callSwal(resFromBackend.success, resFromBackend.success ? 'Palta editada exitosamente':'Algo salió mal...')
    const resFromBackend = await res.json();
    updateCurrentPage(1)
    mutate(`api/palta?action=findAll&page=${currentPage}`);
  }

  //* renderizado del modal
  const renderModal = () => {
    return (
      <Modal
        modalTitle="Info de la palta 🥑"
        setShowModal={setShowModal}
      >
        <ModalChildren
          setShowModal={setShowModal}
          onSubmit={submitDelModal}
          data={paltaEnElModal}
          modo={showModal.modo}
        />
      </Modal>
    );
  };

  //*renderizado principal
  const renderMainContent = () => {

    //cargando....
    if (!data) {
      return (
        <div role="status" className="h-screen flex justify-center items-center">
          <svg aria-hidden="true" className="flex justify-center text-lime-500 items-center mr-2 w-8 h-8 animate-spin " viewBox="0 0 50 50" style={{width: "150px", height: "150px"}}>
            <GiAvocado />
          </svg>
        </div>
      );
    }

    //algo salio mal
    if (error) {
      setMsjContent(error.toString())
      setisHidden(false)
      setisError(true)
    }

    return (
      <div className="flex flex-col h-full justify-center">

        {/* boton agregar */}
        { statePermisos?.some(it => it.nombre === "PALTA_AGREGAR_BUTTON") &&
          <div className="flex justify-start my-2">
              <button
                className="border-2 border-lime-300 bg-white-100 text-green-500 hover:text-white hover:bg-lime-400 p-2  rounded-lg"
                onClick={handleAgregarPalta}>
                  <b className="text-xl">+</b>
                <GiAvocado className="ml-2 text-3xl  inline" />
              </button>
          </div>
        }
        
        {/* datos obtenidos */}
        <div className="space-y-2">
          <Tabla
            data={data.data}
            actions={{
              handleEditarPalta,
              handleEliminarPalta,
              handleVerDetallesPalta
            }}
          />

          <PaginateNavbar
            currentPage={data?.metadata?.page}
            totalPages={data?.metadata?.totalPages}
            handleClick={shouldUpdatePageNumber}
          />

        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-center items-center h-full">
        {renderMainContent()}
      </div>
      {showModal?.display && renderModal()}
    </>
  );
};

export default Index;

export const getServerSideProps = withSessionSsr(async function({ req, res }) {
  const user = req.session.user;

  if (user === undefined) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: {user: req.session.user },
  };
});
