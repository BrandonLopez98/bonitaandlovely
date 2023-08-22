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
import { FaCircle } from "react-icons/fa";
import MoreProductsContainer from "../../components/MoreProducts/MoreProductsContainer";
import SectionReviews from "../../components/modalReviwers/reviewrsDetail/SectionReviews";
import StartsDetail from "../../components/modalReviwers/reviewrsDetail/StartsDetail";

const Detail = () => {
    const { isAuthenticated } = useAuth0();
    const back = useNavigate();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id } = useParams();
    const stateProducts = useSelector(state => state.productsDetail);

    const [userInfo, setUserInfo] = useState({
         nombre: 'Daniel',
        apellido: 'Apellido',
        correoElectronico: 'daniel@gmail.com',
        numeroTelefono: '031934123',
        ciudad: 'miami',
        provincia: 'florida',
        codigoPostal: '6301',
        contraseña: 'djqdijqw' 

        /*    nombre: '',
        apellido: '',
        correoElectronico: '',
        numeroTelefono: '',
        ciudad: '',
        provincia: '',
        codigoPostal: '',
        contraseña: '' */
    });

    const handleProceedToPayment = () => {
        if (!isAuthenticated) {
            Swal.fire('Debes iniciar sesión para continuar', 'error', 'error');
            return;
        }
        if (
            !userInfo.nombre ||
            !userInfo.apellido ||
            !userInfo.correoElectronico ||
            !userInfo.numeroTelefono ||
            !userInfo.ciudad ||
            !userInfo.provincia ||
            !userInfo.codigoPostal ||
            !userInfo.contraseña
        ) {

            Swal.fire('Completa tu información de perfil antes de continuar', 'error');
            return;
        }

        axios.post('/pago', productToPay)
            .then((res) => (window.location.href = res.data.response.body.init_point));
    };

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
  const currentUser = usuarios.find(
    (usuario) =>
      !isLoading &&
      user &&
      usuario.name.toLowerCase() === user.name.toLowerCase() &&
      usuario.correo_electronico.toLowerCase() === user.email.toLowerCase()
  );

  const handleProceedToPayment = () => {
    if (!isAuthenticated) {
      Swal.fire("Debes iniciar sesión para continuar", "error", "error");
      return;
    }
    if (
      !currentUser.name ||
      !currentUser.correo_electronico ||
      !currentUser.telefono ||
      !currentUser.contraseña
    ) {
      Swal.fire("Completa tu información de perfil antes de continuar", "", "error");
      return;
    }
    if (stateProducts.cantidad <= 0) {
      Swal.fire("Producto agotado momentáneamente", "", "error");
      return;
    }
  
    axios
      .post("bonitaandlovely-production-a643.up.railway.app/pago", productToPay)
      .then((res) => (window.location.href = res.data.response.body.init_point));
  };

  useEffect(() => {
    dispatch(getProductsByDetail(id));

    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  const colorIcon1 = "#EBC9BB";
  const colorIcon2 = "#800040";
  const colorIcon3 = "#EF3A57";
  const colorIcon4 = "#C81819";

  const [amount, setAmount] = useState(1);
  const [color, setColor] = useState(colorIcon1);

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
const Clientela = useSelector(state=>state.Allclients); console.log("user"); console.log(JSON.stringify(user,null,2));
const clientFound = isAuthenticated ? Clientela.find(client => client.correo_electronico === user.email) : null;
const NumUserId = isAuthenticated ? extractNumber(clientFound.id) : undefined;

  const addToCart = () => {        
    if (isAuthenticated){ console.log("este es el color de detail", color);
        dispatch(addItemToCartApi({userId: NumUserId, productoId:id, cantidad:amount, colorId: 1}));
    }else{
        dispatch(addItemToCartLS(id, amount, 1)); 
    }
    dispatch(addToCartFunction(id, amount, color));
    const carritotUrl = `/itemadded/${id}?amount=${amount}&color=${color}`;
    navigate(carritotUrl);
}
  const goBack = () => {
    navigate('/catalogo')
  }



  return (
    <><div className="px-6 m-auto max-w-4xl">
      <button onClick={goBack} className="bg-customColor mt-8 mb-8 cursor-pointer text-white py-2 px-4 rounded flex items-center">
 
        Volver
      </button>
      <div className="flex flex-col lg:flex-row gap-12 py-1">
        <div className="flex-shrink-0 w-full max-w-xs rounded-lg overflow-hidden">
          <img
            src={stateProducts.imagenPrincipal}
            alt={stateProducts.name}
            className="w-full h-full object-cover" />
          <div className="flex items-center justify-between bg-gray-100 p-4 mt-4 rounded-md">
            <FaCircle
              color={colorIcon1}
              alt="colorIcon"
              className={`rounded-full cursor-pointer hover:opacity-75 duration-300 ease-in-out ${color === colorIcon1 ? "opacity-100" : "opacity-50"}`}
              onClick={() => {
                setColor(colorIcon1);
              } } />
            <FaCircle
              color={colorIcon2}
              alt="colorIcon"
              className={`rounded-full cursor-pointer hover:opacity-75 duration-300 ease-in-out ${color === colorIcon2 ? "opacity-100" : "opacity-50"}`}
              onClick={() => {
                setColor(colorIcon2);
              } } />
            <FaCircle
              color={colorIcon3}
              alt="colorIcon"
              className={`rounded-full cursor-pointer hover:opacity-75 duration-300 ease-in-out ${color === colorIcon3 ? "opacity-100" : "opacity-50"}`}
              onClick={() => {
                setColor(colorIcon3);
              } } />
            <FaCircle
              color={colorIcon4}
              alt="colorIcon"
              className={`rounded-full cursor-pointer hover:opacity-75 duration-300 ease-in-out ${color === colorIcon4 ? "opacity-100" : "opacity-50"}`}
              onClick={() => {
                setColor(colorIcon4);
              } } />
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full">
          <h2 className="text-3xl capitalize font-bold text-gray-900">
            {stateProducts.name}
          </h2>
          <span className="text-medium ">
          Disponibles: {stateProducts.cantidad}
          </span>
          <h3 className="text-xl font-medium text-customColor">
            ${stateProducts.precio_venta}
          </h3>
    
          <hr />
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
          <hr />
          <div>
            <h3 className="font-medium text-gray-900">Color</h3>
            <div className="mt-4 flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full border-4 transition duration-300 ease-in-out ${color === colorIcon1
                    ? `border-${colorIcon1}`
                    : "border-transparent"}`}
                style={{
                  backgroundColor: `${colorIcon1}`,
                }}
                onClick={() => {
                  setColor(colorIcon1);
                } }
              ></div>
              <div
                className={`w-10 h-10 rounded-full border-4 transition duration-300 ease-in-out ${color === colorIcon2
                    ? `border-${colorIcon2}`
                    : "border-transparent"}`}
                style={{
                  backgroundColor: `${colorIcon2}`,
                }}
                onClick={() => {
                  setColor(colorIcon2);
                } }
              ></div>
              <div
                className={`w-10 h-10 rounded-full border-4 transition duration-300 ease-in-out ${color === colorIcon3
                    ? `border-${colorIcon3}`
                    : "border-transparent"}`}
                style={{
                  backgroundColor: `${colorIcon3}`,
                }}
                onClick={() => {
                  setColor(colorIcon3);
                } }
              ></div>
              <div
                className={`w-10 h-10 rounded-full border-4 transition duration-300 ease-in-out ${color === colorIcon4
                    ? `border-${colorIcon4}`
                    : "border-transparent"}`}
                style={{
                  backgroundColor: `${colorIcon4}`,
                }}
                onClick={() => {
                  setColor(colorIcon4);
                } }
              ></div>
            </div>
          </div>
          <hr />
          <div className="flex justify-between">
            <button
              onClick={addToCart}
              className="w-1/2 mr-4 bg-customColor text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-customColor2 transition duration-300 ease-in-out"
            >
              <img
                src={bagIcon}
                alt="bag icon"
                className="inline-block w-6 h-6 mr-2" />{" "}
              Añadir al carrito
            </button>
            <button
              onClick={() => {
                handleProceedToPayment();
              } }
              className="w-1/2 bg-customColor2 text-customColor py-3 px-6 rounded-lg text-lg font-medium hover:bg-customColor3 transition duration-300 ease-in-out"
              style={{ borderWidth: "2px" }}
            >
              Comprar ahora
            </button>
          </div>

      
            <div className='flex flex-row gap-2 mt-20 m-10 bg-fuchsia-200 rounded-lg p-10 shadow-2xl justify-center items-center'>
          <MoreProductsCardContainer2/>
        </div>
        <SectionReviews/>
        </div>
      </div>
      <br />

    </div></>
  );
};

export default Detail;