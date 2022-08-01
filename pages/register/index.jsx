import React from 'react'
import { useState } from "react";
import Router from "next/router";

//datePickerImports
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';

const RegisterComponent = () => {
  //*action del boton registrarse
  const handleRegister = async (nuevoUsuario) => {
    try {
      //llamada al backend pora verificar credenciales
      const res = await fetch("api/usuario", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          action: "create",
          email: nuevoUsuario.email,
          firstName: nuevoUsuario.firstName,
          lastName: nuevoUsuario.lastName,
          fechaNacimiento: nuevoUsuario.fechaNacimiento.toISOString().split('T')[0] + " 00:00:00",
          dni: nuevoUsuario.dni,
          address: nuevoUsuario.address,
          userName: nuevoUsuario.username,
          telefono: nuevoUsuario.telefono,
          pass: nuevoUsuario.pass,
        }),
      });
      const resFromBackend = await res.json();

      if(!resFromBackend.success){
        //!credenciales invalidas
        alert(resFromBackend.errors[0]);  
      }
      else{
        Router.push("/")
      }
    } catch (error) {
      alert(error.message);
    }
  };
  
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date())

  //*state del formulario de register
  const [paltaRegister, setPaltaRegister] = useState({
    firstName: "",
    lastName: "",
    username: "",
    telefono: "",
    address: "",
    fechaNacimiento: new Date(),
    email: "",
    dni: 0,
    pass: "",
  });

  //* handle los cambios en el formulario de register
  const handleChangeRegisterInputs = (e) => {
    const { name, value } = e.target;

    setPaltaRegister({
      ...paltaRegister,
      [name]: value,
    });
  };
  
  //* handle los cambios en la fcha de nacimiento
  const handleNacimientoInput = (newValue) => {
    setFechaNacimiento(newValue)
    setPaltaRegister({
      ...paltaRegister,
      [fechaNacimiento]: newValue,
    });
  };

  //*handle submit
  const handleRegistrarse = (e) =>{
    e.preventDefault()
    handleRegister(paltaRegister)
  }

  //*handle volver
  const handleVolver = (e) =>{
    e.preventDefault()
    Router.push("/")
  }

  return (
      <div className=' bg-lime-400 border-4 border-dashed border-white p-20 xl:w-1/2 rounded-3xl font-semibold'>
        <div>
          <h1 className='text-center mt-4 text-xl italic'>Registrate con paltas.com</h1>
          <h4 className='text-center mb-6 '>sumate para saber más</h4>
        </div>
        <form className='flex justify-center flex-col items-center gap-4'>
          <div className='row-auto justify-center gap-4 flex w-full'>
            <input type="text" placeholder="Nombre" name="firstName" className=" w-full mt-1 palta-input" required={true} onChange={(e) => handleChangeRegisterInputs(e)}/>
            <input type="text" placeholder="Apellido" name="lastName" className=" w-full mt-1 palta-input" required={true} onChange={(e) => handleChangeRegisterInputs(e)}/>
          </div>
          <div className='row-auto justify-center gap-4 flex w-full'>
            <input type="text" placeholder="Nombre de usuario" name="username" className="w-full  mt-1 palta-input" required={true} onChange={(e) => handleChangeRegisterInputs(e)}/>
            <input type="text" placeholder="Telefono" name="telefono" className=" w-full mt-1 palta-input" required={true} onChange={(e) => handleChangeRegisterInputs(e)}/>
          </div>
          <div className='row-auto justify-center gap-4 flex w-full'>
            <input type="text" placeholder="Dirección" name="address" className="w-full  palta-input" required={true} onChange={(e) => handleChangeRegisterInputs(e)}/>
            <div className="w-full bg-transparent palta-input">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker label="Fecha de nacimiento" value={fechaNacimiento ?? new Date()} name="fechaNacimiento" onChange={(newValue) => handleNacimientoInput(newValue)}  
                  renderInput={({ inputRef, inputProps, InputProps }) => (
                    <Box className='flex items-center' >
                      <input ref={inputRef} {...inputProps} className="w-full"/>
                      <span>{InputProps?.endAdornment}</span>
                    </Box>
                  )}/>
              </LocalizationProvider>
              
            </div>
          </div>
          <div className='row-auto justify-center gap-4 flex w-full'>
            <input type="text" placeholder="Email" name="email" className=" w-full mt-1 palta-input"required={true} onChange={(e) => handleChangeRegisterInputs(e)}/>
            <input type="number" placeholder="Dni" name="dni" className=" w-full mt-1 palta-input" required={true} onChange={(e) => handleChangeRegisterInputs(e)}/>
          </div>
          <div className='row-auto justify-center gap-4 flex w-full'>
            <input type="password" placeholder="Contraseña" name="pass" className=" w-full mt-1 palta-input" required={true} onChange={(e) => handleChangeRegisterInputs(e)}/>
            <input type="password" placeholder="Confirmación contraseña" name="passwordRepeat" className=" w-full mt-1 palta-input" required={true} onChange={(e) => handleChangeRegisterInputs(e)}/>
          </div>
          
          <div className='row-auto justify-center gap-4 flex w-full'>
            <button className="w-full palta-button mt-5 bg-red-500 hover:text-white" onClick={(e) => handleVolver(e)}>
              Volver
            </button>
            <button type="submit" className="w-full palta-button mt-5 bg-blue-400 hover:text-white" onClick={(e) => handleRegistrarse(e)}>
              Registrarse
            </button>
          </div>
        </form>
      </div>
  )
}

export default RegisterComponent