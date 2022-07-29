import Image from 'next/image';
import { useState, useEffect } from "react";

import { useCurrentUser } from '../../zustand/SessionStore';

import Logout from './logout';

const Header = () => {

    //* ----- Zustand: usuario actual -----
    //getter, y proxy de Usuario Actual
    const getUser = useCurrentUser((state) => state.get_CurrentUser)
    const [stateUser, setStateUser] = useState()

    //uso proxy para hidratar la pagina en tiempo de carga. Esto previene hydration error
    useEffect(() => {
        setStateUser(getUser)
    },[getUser])

    //* render del componente
    return (
        <header className="bg-lime-500 h-16">
            <div className="flex flex-row justify-around h-full items-center">
                {
                    stateUser && 
                    <div className="flex justify-around w-full text-white">
                        <div className="flex justify-center items-center">
                            <Image
                                src={"/userAnon.jfif"}
                                alt="Picture of the palta"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                            <h1 className="ml-2">Bienvenido {stateUser?.lastName+" "}{stateUser?.userName}</h1>
                        </div>

                        <div>
                            <Logout/>
                        </div>
                    </div>
                }
            </div>
        </header>
    )
}

export default Header