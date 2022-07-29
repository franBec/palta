import { useCurrentUser } from '../../zustand/SessionStore';
import { useState, useEffect } from 'react';
import Router from "next/router";

const IsLogged = () => {
    const getUser = useCurrentUser((state) => state.get_CurrentUser)
  
    const [stateUser, setStateUser] = useState()
    useEffect(() => {
        setStateUser(getUser)
        if(!stateUser){
            Router.push("/")
        }
    },[])

    return null
};

export default IsLogged;