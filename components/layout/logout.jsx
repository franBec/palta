import Link from "next/link"
import { AiOutlinePoweroff } from "react-icons/ai";

import { useCurrentUser } from "../../zustand/SessionStore";
import {useLoadingBlockingAnimation} from '../../zustand/LoadingStore'

const Logout = () => {

    //* ------ Zustand: al momento de desloguearse, se limpia el usuario y los permisos
    const setUser = useCurrentUser((state) => state.set_CurrentUser)
    const setPermisos = useCurrentUser((state) => state.set_permisosCurrentUser)
    //getter y setter de la animacion bloqueante
    const setIsLoadingBloqueante = useLoadingBlockingAnimation((state) => state.set_isLoading)

    const handleLogout = async () => {
        setIsLoadingBloqueante(true)
        setUser(null)
        setPermisos(null)
    }

    return (
        <Link href="/api/auth/logout">
            <button className="rounded flex justify-center items-center border-2 my-3 bg-red-500 border-red-800 p-2" onClick={handleLogout}>
                <AiOutlinePoweroff />
                <span className="pl-2">Log out </span>
            </button>
        </Link>
    )
}

export default Logout