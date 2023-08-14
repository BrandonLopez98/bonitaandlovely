import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux'
import axios from 'axios'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Miperfil = () => {
  const { user, isLoading } = useAuth0();
  const [showPassword, setShowPassword] = useState(false);
  const [buttonSwitch, setButtonSwitch] = useState(false);
  // const userInforDatabase = useSelector((state) => state.userInfo)
  const [userInfo, setUserInfo] = useState({
    // nombre: userInforDatabase.nombre,
    // apellido: userInforDatabase.apellido,
    // correoElectronico: userInforDatabase.email,
    // numeroTelefono: userInforDatabase.numero,
    // ciudad: userInforDatabase.ciudad,
    // provincia: userInforDatabase.provincia,
    // codigoPostal: userInforDatabase.codigoPostal,
    // contraseña: userInforDatabase.contraseña
  });
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

  const handleSubmit = () => {
    axios.put()
    console.log(userInfo); // Solo para demostración
    // Esta funcion es la que se encargara de enviar un put a la base de datos para actualizar los datos del cliente en base de datos
    // mediante los inputs
  }

  return (
    <div className="h-screen flex max-w-full">
      <div className=" flex-shrink-0">
        <div className="  shadow-lg  p-5  h-full ">
          <div className="flex flex-col items-center justify-center space-y-4">
            <img
              style={{ width: '270px' }}
              className="rounded-full object-cover ml-10 mr-10"
              src={!isLoading ? user.picture : 'Loading...'}
              alt="Profile Picture"
            />
            <h1 className="text-2xl font-bold">
              {!isLoading ? user.name : 'Loading...'}
            </h1>
            <p className="text-gray-600">
              {!isLoading ? user.email : 'Loading...'}
            </p>
            
            <p className="text-gray-600"></p>
            {!buttonSwitch ? (
              <button
                className="m-5 bg-blue-500 text-white px-3 flex items-center justify-center py-1 rounded-md hover:bg-blue-700"
                onClick={() => setButtonSwitch(true)}
              >
                Edit profile
              </button>
            ) : (
              <>
                <button
                  className="m-5 bg-green-500 text-white px-3 flex items-center justify-center py-1 rounded-md hover:bg-green-600"
                  onClick={() => {
                    setButtonSwitch(false);
                    handleSubmit();
                  }}
                >
                  Guardar Cambios
                </button>
                <button
                  className="m-5 bg-gray-500 text-white px-3 flex items-center justify-center py-1 rounded-md "
                  onClick={() => setButtonSwitch(false)}
                >
                  Cancel
                </button>
              </>
            )}

          </div>

        </div>
      </div>

      <div className=" m-5 flex-shrink-0">
        <div className="shadow-lg p-5 rounded-lg h-full ">
          <div className="w-1/2 inline-block">
            <dl className="form-group">
              <label htmlFor="nombre" className="font-bold">
                Nombre
              </label>
              <input
                className="form-control bg-white border border-gray-400 rounded-md p-2 w-full mb-2"
                type="text"
                placeholder="Ingresa tu nombre"
                name="nombre"
                value={userInfo.nombre}
                onChange={handleChange}
                disabled={!buttonSwitch}
              />
              <p className="note text-gray-500 text-sm">
                Ingresa aqui tu direccion de envio
              </p>
            </dl>

            <dl className="form-group mt-5">
              <dt>
                <label htmlFor="correoElectronico" className="font-bold">
                  Correo Electronico
                </label>
              </dt>
              <dd className="d-inline-block">
                <div>
                  <input
                    className="form-control bg-white border border-gray-400 rounded-md p-2 w-full mb-2"
                    type="text"
                    placeholder="Ingresa tu correo electronico"
                    name="correoElectronico"
                    value={userInfo.correoElectronico}
                    onChange={handleChange}
                    disabled={!buttonSwitch}
                  />
                  <p className="note text-gray-500 text-sm">
                    Ingresa aqui tu correo electronico
                  </p>
                  <br />

                  <label htmlFor="numeroTelefono" className="font-bold">
                    Numero telefonico
                  </label>
                  <input
                    className="form-control bg-white border border-gray-400 rounded-md p-2 w-full mb-2"
                    type="text"
                    placeholder="Ingresa tu número telefonico"
                    name="numeroTelefono"
                    value={userInfo.numeroTelefono}
                    onChange={handleChange}
                    disabled={!buttonSwitch}
                  />
                  <p className="note text-gray-500 text-sm">
                    Ingresa aqui tu numero telefonico
                  </p>
                  <br />

                  <label htmlFor="contraseña" className="font-bold">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      className="form-control bg-white border border-gray-400 rounded-md p-2 w-full mb-2"
                      type={showPassword ? "text" : "password"}
                      placeholder="Ingresa tu contraseña"
                      name="contraseña"
                      value={userInfo.contraseña}
                      onChange={handleChange}
                      disabled={!buttonSwitch}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={handleToggleShowPassword}>
                      {showPassword ? <SeeIcon /> : <SeeSlashIcon />}
                    </div>
                  </div>
                  <p className="note text-gray-500 text-sm">
                    Ingresa aqui tu contraseña
                  </p>
                  <br />

                </div>
              </dd>
            </dl>
          </div>
          <div className="w-1/2 inline-block">
            <dl className="form-group ml-10">
              <label htmlFor="apellido" className="font-bold">
                Apellido
              </label>
              <input
                className="form-control bg-white border border-gray-400 rounded-md p-2 w-full mb-2"
                type="text"
                placeholder="Ingresa tu apellido"
                name="apellido"
                value={userInfo.apellido}
                onChange={handleChange}
                disabled={!buttonSwitch}
              />
              <p className="note text-gray-500 text-sm">
                Ingresa aqui tu apellido
              </p>
              <br />

              <label htmlFor="ciudad" className="font-bold">
                Ciudad
              </label>
              <input
                className="form-control bg-white border border-gray-400 rounded-md p-2 w-full mb-2"
                type="text"
                placeholder="Ingresa tu ciudad"
                name="ciudad"
                value={userInfo.ciudad}
                onChange={handleChange}
                disabled={!buttonSwitch}
              />
              <p className="note text-gray-500 text-sm">
                Ingresa tu ciudad
              </p>
              <br />

              <label htmlFor="provincia" className="font-bold">
                Provincia
              </label>
              <input
                className="form-control bg-white border border-gray-400 rounded-md p-2 w-full mb-2"
                type="text"
                placeholder="Ingresa tu provincia"
                name="provincia"
                value={userInfo.provincia}
                onChange={handleChange}
                disabled={!buttonSwitch}
              />
              <p className="note text-gray-500 text-sm">
                Ingresa aqui tu provincia
              </p>
              <br />

              <label htmlFor="codigoPostal" className="font-bold">
                Codigo postal
              </label>
              <input
                className="form-control bg-white border border-gray-400 rounded-md p-2 w-full mb-2"
                type="text"
                placeholder="Ingresa tu codigo postal"
                name="codigoPostal"
                value={userInfo.codigoPostal}
                onChange={handleChange}
                disabled={!buttonSwitch}
              />
              <p className="note text-gray-500 text-sm">
                Ingresa aqui tu codigo postal
              </p>
              <br />
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Miperfil;