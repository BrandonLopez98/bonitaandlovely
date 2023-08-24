import { useState } from 'react';
import ProductCard from './card'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { clientes, userCompras  } from '../../redux/actions';

const MisCompras = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clientes());
  }, [dispatch, clientes]); // Agrega como dependencia la acción "clientes()", para que useEffect se ejecute cada vez que se complete la acción

  const usuarios = useSelector((state)=> state.Allclients);
  const { user } = useAuth0();
  const currentUser = usuarios.find((usuario) => {
    return usuario.name.toLowerCase() === user.name.toLowerCase() && usuario.correo_electronico.toLowerCase() === user.email.toLowerCase();
  });
  const extractIdNumber = (id) => {
    const idParts = id.split('-'); // Separa el string en partes utilizando el carácter "-"
    return parseInt(idParts[1]); // Convierte la segunda parte a un número entero y lo retorna
  };
  const idNumber = extractIdNumber(currentUser.id); //
  console.log(currentUser);
  console.log(idNumber);
 
  
  useEffect(() => {
      dispatch(userCompras(idNumber));
    }, [dispatch, idNumber]);
    const userComprasById = useSelector((state) => state.userCompras)
    console.log(userComprasById);
  
     

  return (
    <>
      <h2 className="text-4xl text-center font-bold text-gray-00  my-8 pb-4">
        Mis compras
      </h2>
      {userComprasById?.productos?.length > 0 ? (
        <div className="flex flex-row justify-start">
          <div className="grid grid-cols-1 gap-8 w-4/5 mx-auto">
            {userComprasById?.productos?.map((product) => (
              <div key={product.id} className="bg-white rounded-md shadow-md">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center p-20 my-8">
          <p className="text-gray-600 text-xl font-medium">
            No ha realizado compras aún
          </p>
        </div>
      )}
    </>
  );
};

export default MisCompras;