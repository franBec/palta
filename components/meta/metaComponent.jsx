import { useCurrentUser } from '../../zustand/SessionStore';
import { useState, useEffect } from 'react';
import Router from "next/router";

const IsLogged = ({ children }) => {
    const getUser = useCurrentUser((state) => state.get_CurrentUser)
  
    const [stateUser, setStateUser] = useState()
    useEffect(() => {
        setStateUser(getUser)
    },[])

    console.log("PROBANDOO",stateUser)
    const renderContent = () => {
        if(stateUser){
            return (
                <>
                {children}
                </>
            );
        }else{
            Router.push("/")
        }
    }

    return (renderContent());
};

export default IsLogged;