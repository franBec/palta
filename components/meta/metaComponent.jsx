import { useEffect } from 'react';
import Router from "next/router";
import useSWR from "swr";

import { useCurrentUser } from "../../zustand/SessionStore";

const IsLogged = () => {
    //* ------ Zustand: al momento de desloguearse, se limpia el usuario y los permisos
    const setUser = useCurrentUser((state) => state.set_CurrentUser)
    const setPermisos = useCurrentUser((state) => state.set_permisosCurrentUser)

    const fetchLogin = async (url) => {
        const res = await fetch(url);
        const resjson = await res.json();
        return resjson;
    };
    //*swr
    const { data, error, mutate } = useSWR(
        "/api/user/user",
        fetchLogin
    );

    useEffect(() => {
        if(!data?.isLoggedIn){
            setUser(null)
            setPermisos(null)
            Router.replace("/")
        }
    },[])

    return null
};

export default IsLogged;