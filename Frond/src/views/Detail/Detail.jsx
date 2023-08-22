
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bagIcon from '../../assets/img/baghandleWhite.svg';
//import colorIcon from '../../assets/img/colorIcon.svg'
<<<<<<< HEAD
import { getProductsByDetail, cleanDetail, addToCartFunction, addItemToCartLS, addItemToCartApi, clientes } from "../../redux/actions";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useAuth0 } from '@auth0/auth0-react';
import { FaCircle } from "react-icons/fa";
import MoreProductsContainer from "../../components/MoreProducts/MoreProductsContainer";

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

        axios.post('http://localhost:3001/pago', productToPay)
            .then((res) => (window.location.href = res.data.response.body.init_point));
    };

    const updateNombre = (nombre) => {
        setUserInfo((prevUserInfo) => ({ ...prevUserInfo, nombre }));
      };
      
      const updateApellido = (apellido) => {
        setUserInfo((prevUserInfo) => ({ ...prevUserInfo, apellido }));
      };

      
    useEffect(() => {
        dispatch(getProductsByDetail(id));
    

        return () => {
            dispatch(cleanDetail());
        };
    }, [dispatch, id]);


  /* const [images, setImages] = useState({
        img1: stateProducts.imagenPrincipal,
       // img2: stateProducts.imagenes && stateProducts.imagenes[0] ? stateProducts.imagenes[0] : null,
        //img3: stateProducts.imagenes && stateProducts.imagenes[1] ? stateProducts.imagenes[1] : null,
        //img4: stateProducts.imagenes && stateProducts.imagenes[2] ? stateProducts.imagenes[2] : null
    }); 
    */
    const colorIcon1 = "#835846";
    const colorIcon2 = "#f4a9a5";
    const colorIcon3 = "#eb0c15";
    const colorIcon4 = "#C81819";

  // const [activeImg, setActiveImage] = useState(images.img1) //stateProducts

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

    return (
        <div className="mt-40 mb-40">

            <button className="ml-40 bg-customColor text-white text-1xl font-semibold py-2 px-2 rounded-xl flex items-center gap-2" onClick={() => back('/catalogo')}>
                Atrás
            </button>

            <div className='flex flex-col justify-between ml-60 mr-60 lg:flex-row gap-16 lg:items-center'>
                <div className='flex flex-col gap-6 lg:w-1/3 items-center mx-auto'>
                    <img src={stateProducts.imagenPrincipal} alt="" className='w-40% h-40% aspect-square object-cover rounded-xl ml-1' />
                    <div className='flex flex-row justify-between h-24'>
                    { /* <img src={images.img1} alt="" className='w-20 h-30 p-2 m-3rounded-md cursor-pointer border border-grey-500 border-5 rounded-lg' onClick={() => setActiveImage(images.img1)} />
                      <img src={images.img2} alt="" className='w-20 h-30 p-2 m-3rounded-md cursor-pointer border border-grey-500 border-5 rounded-lg' onClick={() => setActiveImage(images.img2)} />
                        <img src={images.img3} alt="" className='w-20 h-30 p-2 m-3rounded-md cursor-pointer border border-grey-500 border-5 rounded-lg' onClick={() => setActiveImage(images.img3)} />
                        <img src={images.img4} alt="" className='w-20 h-30 p-2 m-3rounded-md cursor-pointer border border-grey-500 border-5 rounded-lg' onClick={() => setActiveImage(images.img4)} />
    */  }  </div>
                </div>

                <div className='flex flex-col gap-4 lg:w-2/4'>
                    <div>
                        <div>
                            {stateProducts.productos && stateProducts.productos.map((item) => (
                                <p key={item.id}> {item.name.toUpperCase()}</p>
                            ))}
                        </div>
                        <h1 className='text-4xl font-bold'>{stateProducts.name}</h1>
                    </div>
                    <p className='text-gray-700 text-2xl'> {stateProducts.descripcion}</p>
                    <h3 className='text-3xl font-semibold'> $ {stateProducts.precio_venta}</h3>
                    <div className='flex flex-row items-center gap-12'>
                        <div className='flex flex-row gap-3'>
                          <div className='relative'>
                                <FaCircle color={colorIcon1} alt="colorIcon" className="w-7 h-7 z-10" style={{ zIndex: 10 }} onClick={() => { setColor(colorIcon1) /*; setActiveImage(images.img1); */ }}  />
                            </div>
                            <div className='relative'>
                                <FaCircle color={colorIcon2} alt="colorIcon" className="w-7 h-7 z-10" style={{ zIndex: 10 }} onClick={() => { setColor(colorIcon2) /* ; setActiveImage(images.img2); */ }} />
                            </div>
                            <div className='relative'>
                                <FaCircle color={colorIcon3} alt="colorIcon" className="w-7 h-7 z-10" style={{ zIndex: 10 }} onClick={() => { setColor(colorIcon3) /* ; setActiveImage(images.img3); */ }}  />
                            </div>
                            <div className='relative'>
                                <FaCircle color={colorIcon4} alt="colorIcon" className="w-7 h-7 z-10" style={{ zIndex: 10 }} onClick={() => { setColor(colorIcon4) /*; setActiveImage(images.img4);*/ }} />
                            </div> 
                        </div>
                    </div>
                    <div className='flex flex-row items-center gap-2 mb-10'>
                        <button className='bg-gray-200 py-2 px-2 rounded-lg text-customColor text-1xl' onClick={handleDecrement}>-</button>
                        <span className='py-2 px-4 rounded-lg'>{amount}</span>
                        <button className='bg-gray-200 py-2 px-2 mr-4 rounded-lg text-customColor text-1xl' onClick={handleIncrement}>+</button>

                        <button onClick={addToCart} className='bg-customColor text-white text-1xl font-semibold py-2 px-2 rounded-xl flex items-center gap-2' style={{ width: 'auto' }}>
                            <img src={bagIcon} alt="bag icon" className="w-6 h-6 " />
                            Agregar al carrito
                        </button>

                        <button
                            className="bg-customColor text-white text-1xl font-semibold py-2 px-2 rounded-xl flex items-center gap-2"
                            onClick={() => {
                                handleProceedToPayment();
                                updateNombre(userInfo.nombre);
                                updateApellido(userInfo.apellido);
                              }}
                            >
                            Comprar ahora
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex flex-row gap-2 mt-20 m-10 bg-fuchsia-200 rounded-lg p-10 shadow-2xl justify-center items-center'>
          <MoreProductsContainer/>
        </div>
        
        </div>
    );
}

export default Detail;

