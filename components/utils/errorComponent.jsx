const ErrorComponent = ({message}) => {
  return (
    <div className="bg-red-400 text-white p-4 rounded-lg space-y-4">
        <p className="text-5xl font-bold">Ocurrió un error... contactese con los chicos de runa</p>
        {message && <p>Detalles del error: {message}</p>}
    </div>
  )
}

export default ErrorComponent