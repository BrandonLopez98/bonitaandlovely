import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteAPI, addFavoriteLS, addItemToCartLS, addToCartFunction, deleteFavoriteAPI, deleteFavoriteLS } from "../../redux/actions";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

const Card = ({ id, name, precio, imagenPrincipal }) => {
  const dispatch = useDispatch();
  const localFavorites = useSelector(state => state.localFavorites);
  const favorites = useSelector(state => state.favorites)
  const favoritesRaw = useSelector(state=> state.favoritesRaw)
  const {user, isAuthenticated} = useAuth0()
  const [isFavorite, setIsFavorite] = useState(localFavorites.some(item => item.id === id));
  
  const extractNumber = (string) => {
    const match = string.match(/\d+/); // Busca uno o más dígitos en la cadena
    return match ? parseInt(match[0]) : 0; // Convierte el resultado a un número o devuelve 0 si no hay coincidencia
  };
  
  const productoId = extractNumber(id)
  const correo_electronico = user?.email
  const favorito = {
    productoId,
    correo_electronico
  }
  
  const handleFavoriteClick = () => {
    if (isFavorite) {
      if (isAuthenticated) {
        if (favoritesRaw.length > 0) {
          const resultado = favoritesRaw.find(objeto => objeto.productoId === id);
          if (resultado) {
            const idFav = resultado.id;
            const favoritoR = {
              correo_electronico,
              idFav,
              id
            };
            dispatch(deleteFavoriteAPI(favoritoR));
          }
      }
      } else {
        dispatch(deleteFavoriteLS(id));
      }
    } else {
      if (isAuthenticated) {
        dispatch(addFavoriteAPI(favorito))
      } else {
        dispatch(addFavoriteLS(id));
      }
    }
    setIsFavorite(!isFavorite); 
  };

  const colorIcon1 = "#EBC9BB";
 

  useEffect(() => {
    if (isAuthenticated) {
      setIsFavorite(favorites.some(objeto => objeto.id === id));
    } else {
      setIsFavorite(localFavorites.some(item => item.id === id));
    }
  }, [localFavorites, favorites, id, isAuthenticated]);

  const [amount, setAmount] = useState(1);
  const [color, setColor] = useState(colorIcon1);

  const addToCart = () => {
    dispatch(addItemToCartLS(id, amount, color))
    dispatch(addToCartFunction(id, amount, color));
    Swal.fire({
      icon: 'success',
      title: 'Agregado Exitosamente',
      showConfirmButton: false,
      timer: 1500
    })
}


  return (
    <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl sm:max-w-md">
      <Link to={`/detail/${id}`}>
        <img
          className="object-cover h-48 w-full"
          src={imagenPrincipal}
          alt={name}
        />
      </Link>
      <div className="relative px-4 py-5 bg-white">
        <div className="flex justify-between items-center">
          <h3 className="text-xl leading-tight font-semibold text-gray-800">{name}</h3>
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