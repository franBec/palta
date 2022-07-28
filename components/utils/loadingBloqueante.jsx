import {useLoadingBlockingAnimation} from '../../zustand/LoadingStore'
  
const LoadingBloqueante = () => {

  //* ------ Zustand: bloquear pantalla porque algo importante está cargando
  const getIsLoadingBloqueante = useLoadingBlockingAnimation((state) => state.get_isLoading)

  const renderLoadingBloqueante = () =>(
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-6xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* aca podes meter animacion, texto, etc */}
            </div>
        </div>
      </div>

      <div className="opacity-70 fixed inset-0 z-40 bg-black">
      </div>
    </>
  )
  return (getIsLoadingBloqueante && renderLoadingBloqueante())
}

export default LoadingBloqueante