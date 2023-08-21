import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyCartLS, addCartLSToApi, deleteArtLS, deleteArtAPI } from "../../redux/actions"
import { NavLink, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Carrito = () => {
    const dispatch = useDispatch();
    // const { user, isAuthenticated } = useAuth0();
    const isAuthenticated = true;
    const userid = "cli-29";
    const extractNumber = (string) => {
        const match = string.match(/\d+/); 
        return match ? parseInt(match[0]) : 0; 
    };
    const NumUserId = extractNumber(userid);
     
    const [userInfo, setUserInfo] = useState({
        nombre: 'Daniel',
        apellido: 'Apellido',
        correoElectronico: 'daniel@gmail.com',
        numeroTelefono: '031934123',
        ciudad: 'miami',
        provincia: 'florida',
        codigoPostal: '6301',
        contraseña: 'djqdijqw'

        // nombre: '',
        // apellido: '',
        // correoElectronico: '',
        // numeroTelefono: '',
        // ciudad: '',
        // provincia: '',
        // codigoPostal: '',
        // contraseña: ''

    });

    const cartLS = useSelector(state => state.localCart); //estos son los item en carrito en local/
    cartLS.forEach(item => {
        console.log("cartLS", item);
        console.log("cartLS id", item.id);
        console.log("cartLS.color", item.color);
        console.log("cartLS.amount", item.amount);
    })

    /* unificar amount de articulos en cartLS*/
    const cartUnif = (cart) => {
        const countMap = {};
        cart.forEach((item) => {
            if (item.id !== undefined && item.id !== null && item.color !== undefined && item.color !== null) {
                const itemKey = `${item.id}_${item.color}`;
                if (countMap[itemKey]) {
                    countMap[itemKey] += item.amount;
                } else {
                    countMap[itemKey] = item.amount;
                }
            }
        });
        const cartUnifRes = Object.keys(countMap).map((itemKey) => {
            const [itemId, color] = itemKey.split('_');
            return {
                objeto: cart.find((item) => item.id === itemId),
                cantidad: countMap[itemKey],
                color: color,
            };
        });
        return cartUnifRes;
    };
    const cartUnificado = cartUnif(cartLS);
    cartUnificado.forEach(item => {
        console.log("cartUnificado item", item);
        console.log("cartUnificado item..id", item.objeto.id);
        console.log("cartUnificado item.color", item.color);
        console.log("cartUnificado item.cantidad", item.cantidad);
        console.log("cartUnificado item.amount", item.objeto.amount);
    })

    useEffect(() => {
        if (isAuthenticated) {
          dispatch(addCartLSToApi({ user: NumUserId, localCart: cartLS }))
            .catch(error => {             
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data || 'Hubo un error en la solicitud.',
              });
            });
        } else {
          return;
        }
        return ()=>{}
    },[]);


    const cartApi = useSelector(state => state.apiCart);


    console.log("cartApi en carrito ", cartApi);


    const totalProd = isAuthenticated && cartApi && cartApi.productos
    ? cartApi.productos.reduce((total, item) => total + (item.precio_venta * item.cantidad), 0)
    : cartUnificado.reduce((total, item) => total + (item.objeto.precio_venta * item.cantidad), 0);

    const totalArts = isAuthenticated && cartApi && cartApi.productos
    ? cartApi.productos.reduce((qty, item) => qty + (item.cantidad), 0)
    : cartUnificado.reduce((qty, item) => qty + (item.cantidad), 0);


    const cartToRender = isAuthenticated ? cartApi : cartUnificado;
console.log("cartToRender", cartToRender); console.log("isAuthenticated", isAuthenticated); console.log("cartApi linea 113", cartApi); console.log("cartUnificado", cartUnificado);
    const handleEmptyCart = () => {
        dispatch(emptyCartLS());
    }
    const handleDeleteArtLS = (item) => {
        dispatch(deleteArtLS(item.objeto.id, item.color));
    }
    const handleDeleteArtAPI = (item) => {        
        dispatch(deleteArtAPI({ user:NumUserId, productoId:item.productoId, colorId:item.colorId }))
    }

    const handleProceedToPayment = () => {
        if (!isAuthenticated) {
            // Si el usuario no está autenticado, mostrar una alerta
            Swal.fire('Debes iniciar sesión para continuar', 'error');
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

        axios.post('http://localhost:3001/pago', cartApi)
            .then((res) => (window.location.href = res.data.response.body.init_point));
    };
    const updateNombre = (nombre) => {
        setUserInfo((prevUserInfo) => ({ ...prevUserInfo, nombre }));
    };

    const updateApellido = (apellido) => {
        setUserInfo((prevUserInfo) => ({ ...prevUserInfo, apellido }));
    };


    return (
        <>
            <div class="grid grid-cols-3 grid-rows-6 gap-5 mx-8 mt-6">
                {/* columna izquierda detallar productos en carrito */}
                
                
                {cartApi || cartUnificado.productos ? ( 
                    <>
                        {isAuthenticated && cartApi.productos ? (
                            cartApi.productos.map((item, index) =>(
                            <div key={index} className="col-span-2 grid grid-cols-6 px-6 mx-6 shadow-lg rounded-lg bg-white">
                                <img src={item.imagenPrincipal} alt="fotoProducto" className="col-start-1 col-span-1 w-16 h-16 place-self-center object-cover border-2 border-indigo-200 rounded-full" />
                                <div class="col-start-2 col-span-2 place-self-center grid grid-rows-2">
                                    <div className="grid-row-1 font-medium">
                                        {item.name}
                                    </div>
                                    <div className="grid-row-2 text-xs">
                                        {item.color}
                                    </div>
                                </div>
                                <div className="col-start-4 col-span-1 flex items-center justify-center font-medium ">
                                    <p class="text-xs mr-1">Cantidad: </p> {item.cantidad}
                                </div>
                                <div className="col-start-5 col-span-1 flex items-center justify-end font-medium ">
                                    <p class="text-xs mr-1">Costo: </p>{item.precio_venta * item.cantidad}
                                </div>
                                <button
                                    onClick={() => handleDeleteArtAPI(item)}
                                    className="col-start-6 rounded-md place-self-center px-1.5 text-gray-400 bg-gray-200 hover:bg-gray-100"
                                >
                                    X
                                </button>
                            </div>
                        ))
                       ) : (
                            cartUnificado.map((item, index) => (
                            <div key={index} className="col-span-2 grid grid-cols-6 px-6 mx-6 shadow-lg rounded-lg bg-white">

                                <img src={item.objeto.imagenPrincipal} alt="fotoProducto" className="col-start-1 col-span-1 w-16 h-16 place-self-center object-cover border-2 border-indigo-200 rounded-full" />

                                <div class="col-start-2 col-span-2 place-self-center grid grid-rows-2">
                                    <div className="grid-row-1 font-medium">
                                        {item.objeto.name}
                                    </div>
                                    <div className="grid-row-2 text-xs">
                                        {item.color}
                                    </div>
                                </div>

                                <div className="col-start-4 col-span-1 flex items-center justify-center font-medium ">
                                    <p class="text-xs mr-1">Cantidad: </p> {item.cantidad}
                                </div>
                                <div className="col-start-5 col-span-1 flex items-center justify-end font-medium ">
                                    <p class="text-xs mr-1">Costo: </p>{item.objeto.precio_venta * item.cantidad}
                                </div>
                                <button
                                    onClick={() => handleDeleteArtLS(item)}
                                    className="col-start-6 rounded-md place-self-center px-1.5 text-gray-400 bg-gray-200 hover:bg-gray-100"
                                >
                                    X
                                </button>
                            </div>
                        ))
                        )}                                                                    
                    </>
                ) : (
                    <div className="col-span-2 grid grid-cols-5 px-6 mx-6 shadow-md rounded-lg bg-fuchsia-100">
                        <div className="col-start-2 col-span-3 flex items-center justify-center font-medium">
                            No hay artículos en su carrito
                        </div>
                    </div>
                ) }                                              

                {/* columna derecha, total y boton a pasarela */}
                <div class="col-start-3 row-start-1 row-end-4 px-6 mx-6 shadow-lg rounded-lg bg-white">

                    <div class="grid grid-cols-4 grid-rows-6 m-4">
                        <h2 class="col-span-4 row-start-1 place-self-center font-medium">
                            Resumen de Compra
                        </h2>

                        <h3 class="col-start-1 col-end-3 row-start-2 place-self-start">
                            Arts. ({totalArts || 0})
                        </h3>
                        <h3 class="col-start-1 col-end-3 row-start-3 place-self-start">
                            Envio
                        </h3>

                        <h2 class="col-start-1 col-end-3 row-start-5 place-self-start font-bold">
                            Total
                        </h2>

                        <h2 class="col-start-4 row-start-2 place-self-start">
                            {totalProd || 0}
                        </h2>
                        <h2 class="row-start-3 col-start-4  place-self-start">
                            0
                        </h2>
                        <h2 class="row-start-5 col-start-4  place-self-start font-bold">
                            {totalProd || 0}
                        </h2>

                        <button class="rounded-md row-start-6 place-self-center col-span-4 p-1.5 text-white bg-fuchsia-300 hover:bg-gradient-to-r from-[#c9aecf] via-[#c9aecf] to-[#d39de6] transition duration-300"
                            onClick={() => {
                                handleProceedToPayment();
                                updateNombre(userInfo.nombre);
                                updateApellido(userInfo.apellido);
                            }}
                        >
                            Continuar compra
                        </button>

                    </div>
                </div>
                <div class="col-start-3 col-end-4 row-start-4 row-end-4 col-span-1 flex place-self-center">
                    <NavLink to="/catalogo">
                        <button class="rounded-md place-self-center p-1.5 text-white bg-[#6b086f] hover:bg-[#7c4884]">
                            Agregar articulos
                        </button>
                    </NavLink>
                </div>
            </div>
        </>
    )

};

export default Carrito;