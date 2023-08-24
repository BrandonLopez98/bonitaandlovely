
import React, { useEffect } from 'react';

import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { clientes } from '../../redux/actions';

const Miperfil = () => {
  const dispatch = useDispatch()
  useEffect(
    () => {
        dispatch(clientes());
      },[])
  const { user, isLoading } = useAuth0();
  const [showPassword, setShowPassword] = useState(false);
  const [buttonSwitch, setButtonSwitch] = useState(false);

  const usuarios = useSelector((state)=> state.Allclients);
  const currentUser = usuarios.find((usuario) => {
    return usuario.name.toLowerCase() === user.name.toLowerCase() && usuario.correo_electronico.toLowerCase() === user.email.toLowerCase();
  });
  console.log(currentUser);
  console.log(usuarios)

  const [userInfo, setUserInfo] = useState({
    name: currentUser.name ? currentUser.name.split(' ')[0] : '',
    apellido: currentUser.name ? currentUser.name.split(' ')[1] : '',
    correo_electronico: currentUser.correo_electronico ? currentUser.correo_electronico : '',
    telefono: currentUser.telefono ? currentUser.telefono : '',
    ciudad: currentUser.direccion ? currentUser.direccion.split(',')[0]: '',
    provincia: currentUser.direccion ? currentUser.direccion.split(',')[1]: '',
    codigoPostal: currentUser.direccion ? currentUser.direccion.split(',')[2]: '',
    contraseña: currentUser.contraseña ? currentUser.contraseña : ''

  });

  const userToEdit = {
    imagen: null,
    name: `${userInfo.name} ${userInfo.apellido}`,
    telefono: userInfo.telefono,
    correo_electronico: userInfo.correo_electronico,
    direccion: `${userInfo.ciudad}, ${userInfo.provincia}, ${userInfo.codigoPostal}`,
    contraseña: userInfo.contraseña,
  }

  const SeeIcon = showPassword ? FaEye : FaEye;
  const SeeSlashIcon = showPassword ? FaEye : FaEyeSlash;

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  console.log(userInfo)

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setUserInfo({
      ...userInfo,
      [name]: value
    });
  }


  const handleSubmit = (id) => {
    const extractIdNumber = (id) => {
      const idParts = id.split('-'); // Separa el string en partes utilizando el carácter "-"
      return parseInt(idParts[1]); // Convierte la segunda parte a un número entero y lo retorna
    };
    const idNumber = extractIdNumber(id);
    try {
      axios.put(`/cliente/${idNumber}`, userToEdit) // Agregar aquí la petición PUT para actualizar los datos de usuario en la base de datos
      console.log(userInfo); // Solo para demostración
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="h-screen flex max-w-full">
      {/* Columna izquierda */}
      <div className="w-1/3 flex-shrink-0">
        <div className="p-5 h-full">
          <div className="flex mt-5 flex-col items-center justify-center space-y-4">
            <img
              style={{ width: '270px', height: '270px' }}
              className="rounded-full object-cover ml-10 mr-10 border-solid border-4 border-gray-200"
              src={!isLoading ? user.picture : 'Loading...'}
              alt="Profile"
            />
            <h1 className="text-4xl font-bold mb-2 text-gray-600">
              {!isLoading ? user.name : 'Loading...'}
            </h1>
            <p className="text-gray-400 text-lg mb-5">
              {!isLoading ? user.email : 'Loading...'}
            </p>
            {!buttonSwitch ? (
              <button
                className="bg-purple-600 text-white px-3 flex items-center justify-center py-2 rounded-md  w-56 mb-10"
                onClick={() => setButtonSwitch(true)}
              >
                Editar perfil
              </button>
            ) : (
              <>
                <button
                  className="bg-green-500 text-white px-3 flex items-center justify-center py-2 rounded-md hover:bg-green-600 w-56 mb-10"
                  onClick={() => {
                    setButtonSwitch(false);
                    handleSubmit(currentUser.id);
                  }}
                >
                  Guardar cambios
                </button>
                <button
                  className="bg-gray-500 text-white px-3 flex items-center justify-center py-2 rounded-md w-56 mb-10"
                  onClick={() => setButtonSwitch(false)}
                >
                  Cancelar
                </button>
              </>
            )}

          </div>
        </div>
      </div>

      {/* Columna derecha */}
      <div className="w-2/3 m-5 flex-shrink-0">

      <h1 className="flex ml-20 text-4xl font-bold mb-2 text-gray-600">Mi Perfil</h1>

        <div className="pt-5 pb-10 px-20 flex flex-col items-center  bg-white rounded-lg shadow-lg h-full">
          <div className="w-full flex justify-between">
            {/* Columna izquierda de la derecha */}
            <div className="w-5/12">
              <dl className="form-group">

                <label htmlFor="name" className="font-bold text-gray-600 mb-1">

                  Nombre
                </label>
                <input
                  className="form-control bg-gray-100 border border-gray-300 rounded-md p-2 w-full mb-2"
                  type="text"
                  placeholder="Ingresa tu nombre"

                  name="name"
                  value={userInfo.name}

                  onChange={handleChange}
                  disabled={!buttonSwitch}
                />
              </dl>

              <dl className="form-group mt-5">
                <dt>

                  <label htmlFor="correo_electronico" className="font-bold text-gray-600 mb-1">

                    Correo electrónico
                  </label>
                </dt>
                <dd className="d-inline-block">
                  <input
                    className="form-control bg-gray-100 border border-gray-300 rounded-md p-2 w-full mb-2"
                    type="text"
                    placeholder="Ingresa tu correo electrónico"

                    name="correo_electronico"
                    value={userInfo.correo_electronico}

                    onChange={handleChange}
                    disabled={!buttonSwitch}
                  />
                </dd>
              </dl>

              <dl className="form-group mt-5">
                <dt>

                  <label htmlFor="telefono" className="font-bold text-gray-600 mb-1">

                    Número telefónico
                  </label>
                </dt>
                <dd className="d-inline-block">
                  <input
                    className="form-control bg-gray-100 border border-gray-300 rounded-md p-2 w-full mb-2"
                    type="text"
                    placeholder="Ingresa tu número telefónico"

                    name="telefono"
                    value={userInfo.telefono}

                    onChange={handleChange}
                    disabled={!buttonSwitch}
                  />
                </dd>
              </dl>
              <dl className="form-group mt-5">
                <dt>
                  <label htmlFor="codigoPostal" className="font-bold text-gray-600 mb-1">
                    Código postal
                  </label>
                </dt>
                <dd className="d-inline-block">
                  <input
                    className="form-control bg-gray-100 border border-gray-300 rounded-md p-2 w-full mb-2"
                    type="text"
                    placeholder="Ingresa tu código postal"
                    name="codigoPostal"
                    value={userInfo.codigoPostal}
                    onChange={handleChange}
                    disabled={!buttonSwitch}
                  />
                </dd>
              </dl>
           
            </div>

            {/* Columna derecha de la derecha */}
            <div className="w-7/12 ml-10">
              <dl className="form-group">
                <label htmlFor="apellido" className="font-bold text-gray-600 mb-1">
                  Apellido
                </label>
                <input
                  className="form-control bg-gray-100 border border-gray-300 rounded-md p-2 w-full mb-2"
                  type="text"
                  placeholder="Ingresa tu apellido"
                  name="apellido"
                  value={userInfo.apellido}
                  onChange={handleChange}
                  disabled={!buttonSwitch}
                />
              </dl>

              <dl className="form-group mt-5">
                <dt>
                  <label htmlFor="ciudad" className="font-bold text-gray-600 mb-1">
                    Ciudad
                  </label>
                </dt>
                <dd className="d-inline-block">
                  <input
                    className="form-control bg-gray-100 border border-gray-300 rounded-md p-2 w-full mb-2"
                    type="text"
                    placeholder="Ingresa tu ciudad"
                    name="ciudad"
                    value={userInfo.ciudad}
                    onChange={handleChange}
                    disabled={!buttonSwitch}
                  />
                </dd>
              </dl>

              <dl className="form-group mt-5">
                <dt>
                  <label htmlFor="provincia" className="font-bold text-gray-600 mb-1">
                    Provincia
                  </label>
                </dt>
                <dd className="d-inline-block">
                  <input
                    className="form-control bg-gray-100 border border-gray-300 rounded-md p-2 w-full mb-2"
                    type="text"
                    placeholder="Ingresa tu provincia"
                    name="provincia"
                    value={userInfo.provincia}
                    onChange={handleChange}
                    disabled={!buttonSwitch}
                  />
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Miperfil;