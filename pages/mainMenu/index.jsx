import useSWR from "swr";
import swal from "sweetalert"
import { useEffect, useState } from "react";
import { GiAvocado } from "react-icons/gi";
import { withSessionSsr } from "../../lib/session";

import { useCurrentUser } from '../../zustand/SessionStore';
import {useLoadingBlockingAnimation} from '../../zustand/LoadingStore'

import Tabla from "../../components/mainMenu/tabla";
import Modal from "../../components/utils/modal";
import PaginateNavbar from "../../components/utils/pagination/paginateNavbar";
import ModalChildren from "../../components/mainMenu/modalChildren";
import AvocadoLoading from "../../components/layout/avocadoLoading";
import IsLogged from "../../components/meta/metaComponent";
import ErrorComponent from '../../components/utils/errorComponent'

const Index = () => {

  //* ----- zustand stuff -----

  //permisos obtenidos en tiempo de login. Se encuentran en una store de zustand
  const getPermisos = useCurrentUser((state) => state.get_permisosCurrentUser)

  //proxy de los permisos, necesario para evitar rehydration error
  const [statePermisos, setStatePermisos] = useState()
  useEffect(() => {
    setStatePermisos(getPermisos)
  },[getPermisos])

  //getter y setter de la animacion bloqueante
  const setIsLoadingBloqueante = useLoadingBlockingAnimation((state) => state.set_isLoading)

  //* --------------------------

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

    swal(text, {
      icon: success? 'success':'error',
      button: false,
      timer: 3000
    });
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
    
    setIsLoadingBloqueante(true)

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
    
    setIsLoadingBloqueante(false)
    
    callSwal(resFromBackend.success, resFromBackend.success ? 'Palta agregada exitosamente':'Algo salió mal...')
    updateCurrentPage(1)
    mutate(`api/palta?action=findAll&page=${currentPage}`);
  };

  //*Baja
  const deletePalta = async (id) => {

    setIsLoadingBloqueante(true)

    const res = await fetch("api/palta", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        action: "deleteById",
        id: id,
      }),
    });
    
    const resFromBackend = await res.json();

    setIsLoadingBloqueante(false)

    callSwal(resFromBackend.success, resFromBackend.success ? 'Palta eliminada exitosamente':'Algo salió mal...')
    updateCurrentPage(1)
    mutate(`api/palta?action=findAll&page=${currentPage}`);
  }

  //*Modificar
  const editPalta = async (form) => {
    setShowModal({display: false, modo: "lectura"})

    setIsLoadingBloqueante(true)

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


    const resFromBackend = await res.json();

    setIsLoadingBloqueante(false)

    callSwal(resFromBackend.success, resFromBackend.success ? 'Palta editada exitosamente':'Algo salió mal...')
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
      return <AvocadoLoading/>;
    }

    //algo salio mal
    if (error) {
      <ErrorComponent message={error.toString()}/>
    }

    return (
      <div className="flex flex-col h-full justify-center">

        {/* boton agregar */}
        { statePermisos?.some(it => it.nombre === "PALTA_AGREGAR_BUTTON") &&
          <div className="flex justify-start my-2">
              <button
                className="border-2 bg-white border-lime-300 w-full md:w-auto bg-white-100 text-green-500 hover:text-white hover:bg-lime-400 p-2  rounded-lg"
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
      {/* <IsLogged /> */}
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
