import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SectionReviews from "../../components/modalReviwers/reviewrsDetail/SectionReviews";
import bagIcon from '../../assets/img/baghandleWhite.svg';
//import colorIcon from '../../assets/img/colorIcon.svg'
import { getProductsByDetail, cleanDetail, addToCartFunction, addItemToCartLS, addItemToCartApi, clientes } from "../../redux/actions";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";
// import { FaCircle } from "react-icons/fa";

import MoreProductsCardContainer2 from "../../components/MoreProducts/MoreProducts2";

const Detail = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const back = useNavigate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const stateProducts = useSelector((state) => state.productsDetail);
  useEffect(() => {
    dispatch(clientes());
  }, []);
  const usuarios = useSelector((state) => state.Allclients);
  const currentUser = usuarios?.find(
    (usuario) =>
      !isLoading &&
      user &&
      usuario.name.toLowerCase() === user.name.toLowerCase() &&
      usuario.correo_electronico.toLowerCase() === user.email.toLowerCase()
  );
  const extractIdNumber = (id) => {
    const idParts = id.split('-'); // Separa el string en partes utilizando el carácter "-"
    return parseInt(idParts[1]); // Convierte la segunda parte a un número entero y lo retorna
  };
  const idNumber = extractIdNumber(currentUser?.id); //
  const productId = extractIdNumber(id); //
  const [amount, setAmount] = useState(1);

  console.log(amount)
  console.log(productId)

  const productToAdd = {
    productos: [
       {
				cantidad: amount,
			productoId: productId,
				 colorId:1
      }
    ]
  }

  const handleProceedToPayment = async () => {
    if (!isAuthenticated) {
      Swal.fire("Debes iniciar sesión para continuar", "error", "error");
      return;
    }
    if (
      !currentUser.name ||
      !currentUser.correo_electronico ||
      !currentUser.telefono ||
      !currentUser.direccion
    ) {
      Swal.fire("Completa tu información de perfil antes de continuar", "", "error");
      return;
    }
    if (stateProducts.cantidad <= 0) {
      Swal.fire("Producto agotado momentáneamente", "", "error");
      return;
    }
    
    // Actualizar el carrito
    try {
      await axios.put(`carrito/${idNumber}`, productToAdd);
     
      // Si el carrito fue actualizado correctamente, proceder al pago
      const response = await axios.post("http://localhost:3001/pago", productToPay);
      window.location.href = response.data.response.body.init_point;
      
      // Marcar el carrito como pagado
      if(response){
        axios.put(`http://localhost:3001/carrito/pagado/${idNumber}`, { pagado: true });
      }
  
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getProductsByDetail(id));

    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  // const colorIcon1 = "#EBC9BB";
  // const colorIcon2 = "#800040";
  // const colorIcon3 = "#EF3A57";
  // const colorIcon4 = "#C81819";

  // const [color, setColor] = useState(colorIcon1);

  const handleDecrement = () => {
    setAmount((prev) => Math.max(prev - 1, 1));
  };

  const handleIncrement = () => {
    setAmount((prev) => Math.min(prev + 1, 10));
  };

  const productToPay = {
    nombre: stateProducts.name,
    precio: stateProducts.precio_venta,
    descripcion: stateProducts.descripcion,
    imagen: stateProducts.imagenPrincipal,
    quantity: amount,
  };

  const extractNumber = (string) => {
    const match = string.match(/\d+/); 
    return match ? parseInt(match[0]) : 0; 
}; 
// const Clientela = useSelector(state=>state.Allclients); console.log("user"); console.log(JSON.stringify(user,null,2));
// const clientFound = isAuthenticated ? Clientela.find(client => client.correo_electronico === user.email) : null;
// const NumUserId = isAuthenticated ? extractNumber(clientFound.id) : undefined; 
const NumUserId=user;
  const addToCart = () => {        
    if (isAuthenticated){ console.log("Autenticated en detail", isAuthenticated);
        dispatch(addItemToCartApi({userId: NumUserId, productoId:id, cantidad:amount, color:1}));
    }else{ console.log("Autenticated en detail LS", isAuthenticated);
        dispatch(addItemToCartLS(id, amount, 1)); 
    }
    dispatch(addToCartFunction(id, amount, 1)); 
    const carritotUrl = `/itemadded/${id}?amount=${amount}&color=${1}`;
    navigate(carritotUrl); console.log("carritotUrl", carritotUrl);
}
  const goBack = () => {
    navigate('/catalogo')
  }

  return (
    <><div className="px-6 py-12 max-w-7xl mx-auto">
    <button
      onClick={goBack}
      className="bg-customColor text-white py-2 px-4 rounded-lg mb-8"
    >
      Volver
    </button>

    <div className="flex flex-col md:flex-row gap-12">
      <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
        <img
          src={stateProducts.imagenPrincipal}
          alt={stateProducts.name}
          className="w-full object-cover mb-4 rounded-md h-96"
        />
        <div className="flex items-center justify-between bg-gray-100 py-2 px-4 rounded-md">
          <span className="text-gray-500 text-xl font-medium">Cantidad:</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="rounded-lg py-2 px-4 bg-customColor text-white font-semibold text-lg hover:bg-customColor2 transition duration-300 ease-in-out"
              onClick={handleDecrement}
            >
              -
            </button>
            <span className="bg-gray-200 py-2 px-4 rounded-lg text-xl font-medium">
              {amount}
            </span>
            <button
              type="button"
              className="rounded-lg py-2 px-4 bg-customColor text-white font-semibold text-lg hover:bg-customColor2 transition duration-300 ease-in-out"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={addToCart}
            className="w-full md:w-auto bg-customColor text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-customColor2 transition duration-300 ease-in-out"
          >
            <img
              src={bagIcon}
              alt="bag icon"
              className="inline-block w-6 h-6 mr-2"
            />{" "}
            Añadir al carrito
          </button>
          <button
            onClick={() => {
              handleProceedToPayment();
            } }
            className="w-full md:w-auto bg-customColor2 text-customColor py-3 px-6 rounded-lg text-lg font-medium hover:bg-customColor3 transition duration-300 ease-in-out"
            style={{ borderWidth: "2px" }}
          >
            Comprar ahora
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold capitalize text-gray-900 mb-4">
          {stateProducts.name}
        </h2>
        <span className="text-medium">
          Disponibles: {stateProducts.cantidad}
        </span>
        <h3 className="text-xl font-medium text-customColor mt-4">
          ${stateProducts.precio_venta}
        </h3>
        <hr className="my-6" />
        <SectionReviews />
      </div>
    </div>

    <div className='flex flex-row gap-2 mt-10 m-10 bg-fuchsia-200 rounded-lg p-10 shadow-2xl justify-center items-center'>
        <MoreProductsCardContainer2/>
      </div>
  );
  </div></>
  );
};

export default Detail;