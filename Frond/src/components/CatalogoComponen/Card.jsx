import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteAPI, addFavoriteLS, deleteFavoriteAPI, deleteFavoriteLS} from "../../redux/actions";
import { useEffect, useState } from "react";

const Card = ({ id, name, precio_venta,imagenPrincipal }) => {
  const dispatch = useDispatch();
  const localFavorites = useSelector(state => state.localFavorites);
  const favorites = useSelector(state => state.favorites)
  const favoritesRaw = useSelector(state=> state.favoritesRaw)
  const {user, isAuthenticated} = useAuth0()
  // const [isFavorite, setIsFavorite] = useState(localFavorites.some(item => item.id === id));
  
  // const extractNumber = (string) => {
  //   const match = string.match(/\d+/); // Busca uno o más dígitos en la cadena
  //   return match ? parseInt(match[0]) : 0; // Convierte el resultado a un número o devuelve 0 si no hay coincidencia
  // };
  // const productoId = extractNumber(id)
  // const correo_electronico = user?.email
  // const favorito = {
  //   productoId,
  //   correo_electronico
  // }
  // const handleFavoriteClick = () => {
  //   if (isFavorite) {
  //     if (isAuthenticated) {
  //       if (favoritesRaw.length > 0) {
  //         const resultado = favoritesRaw.find(objeto => objeto.productoId === id);
  //         if (resultado) {
  //           const idFav = resultado.id;
  //           const favoritoR = {
  //             correo_electronico,
  //             idFav,
  //             id
  //           };
  //           dispatch(deleteFavoriteAPI(favoritoR));
  //         }
  //     }
  //     } else {
  //       dispatch(deleteFavoriteLS(id));
  //     }
  //   } else {
  //     if (isAuthenticated) {
  //       dispatch(addFavoriteAPI(favorito))
  //     } else {
  //       dispatch(addFavoriteLS(id));
  //     }
  //   }
  //   setIsFavorite(!isFavorite); 
  // };

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     setIsFavorite(favorites.some(objeto => objeto.id === id));
  //   } else {
  //     setIsFavorite(localFavorites.some(item => item.id === id));
  //   }
  // }, [localFavorites, favorites, id, isAuthenticated]);

  return (
    <div className="grid grid-cols-1 rounded-lg bg-white px-5 py-10 relative shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      {/* Agregue la Barra antes de detail */}
      {/* <button onClick={handleFavoriteClick}>
        <AiFillHeart
          className={`absolute overflow-hidden group hover:scale-125 transition-transform duration-300 transform right-2 top-2 text-2xl ${
            isFavorite ? "text-red-500" : "text-slate-400"
          }`}
        />
      </button> */}
      <Link to={`/detail/${id}`} className="w-[50%] h-full m-auto">
        <img
          className="rounded-lg w-full m-auto shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
          src={`${imagenPrincipal}`}
          alt="a"
        />
      </Link>

      <div className="relative px-4 py-5 bg-white">
        <div className="flex justify-between items-center">

          <h3 className="text-xl leading-tight font-semibold capitalize text-gray-800">{name}</h3>

          <button
            className={`relative group p-2 ml-2 ${
              isFavorite ? "text-red-500 font-bold" : "text-gray-400"
            }`}
            onClick={handleFavoriteClick}
          >
            <AiFillHeart className="text-xl transition duration-300 ease-in-out group-hover:text-red-400" />
          </button>
        </div>
        <p className="text-gray-500 mx-1 my-2 text-sm">${precio}</p>
        <button onClick={addToCart} className="block bg-gray-800  text-white uppercase text-sm mx-10 px-8 my-2 p-3 hover:bg-gray-700 transition-all duration-300">
           Agregar al <AiOutlineShoppingCart className="inline-block mr-2 -mt-1 text-xl" />
        </button>
      </div>

    </div>
  );
};

export default Card;