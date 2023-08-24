import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useSelector } from "react-redux";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, user, isLoading } = useAuth0();
  const clientes = useSelector((state) => state.Allclients);



  const handleLogin = async () => {
    await loginWithRedirect();
  };

  if (isLoading) {
    return (
      <div>
        <p>Cargando...</p>
      </div>
    );
  }

  

  if (isAuthenticated && user) {
    const { name, email } = user;
    const admin = email === "bonitaandlovely@gmail.com" && 'passantinodev@gmail.com' ? true : false;
    const userLogin = { name, correo_electronico: email, admin };
    const existeCliente = clientes.find((cliente) => cliente.correo_electronico === email);
    if (existeCliente) {
      console.log("El cliente ya existe en la base de datos");
    } else {
      try {
        const response = axios.post("/cliente", userLogin);
        console.log("El cliente se ha creado con éxito: ", response);
      } catch (error) {
        console.error("Error al crear el cliente: ", error.message);
      }
    }
  }

  return (
    <>
    {isAuthenticated ? (
      <div></div>
    ) : (
      <button className="mr-2" onClick={handleLogin}>
        <strong>Iniciar Sesión</strong>
      </button>
    )}
  </>
  )
  }

export default LoginButton;