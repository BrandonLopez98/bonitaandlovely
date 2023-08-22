import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyCartLS, addCartLSToApi, deleteArtLS, deleteArtAPI } from "../../redux/actions"
import { NavLink, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios, { all } from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Carrito = () => {
    const dispatch = useDispatch();
    // const { user, isAuthenticated } = useAuth0();
    const isAuthenticated = false;
    const userid = "cli-29";
    const extractNumber = (string) => {
        const match = string.match(/\d+/); 
        return match ? parseInt(match[0]) : 0; 
    };
    const NumUserId = extractNumber(userid);
     
    const [userInfo, setUserInfo] = useState({
        nombre: '',
        apellido: '',
        correoElectronico: '',
        numeroTelefono: '',
        ciudad: '',
        provincia: '',
        codigoPostal: '',
        contraseña: ''
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

    useEffect(() => {
        if (isAuthenticated && cartLS) {
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
    }, [isAuthenticated]);

    const cartApi = useSelector(state => state.apiCart);

    const totalProd = isAuthenticated && cartApi && cartApi.productos
    ? cartApi.productos.reduce((total, item) => total + (item.precio_venta * item.cantidad), 0)
    : cartUnificado.reduce((total, item) => total + (item.objeto.precio_venta * item.cantidad), 0);

    const totalArts = isAuthenticated && cartApi && cartApi.productos
    ? cartApi.productos.reduce((qty, item) => qty + (item.cantidad), 0)
    : cartUnificado.reduce((qty, item) => qty + (item.cantidad), 0);

    const cartToRender = isAuthenticated ? cartApi : cartUnificado;

    const handleEmptyCart = () => {
        dispatch(emptyCartLS());
    }

    const handleDeleteArtLS = (item) => {
        dispatch(deleteArtLS(item.objeto.id, item.color));
    }
    const handleDeleteArtAPI = (item) => {
        dispatch(deleteArtAPI({ user: NumUserId, productoId: item.id, colorId: 1 }))
    }

    const handleProceedToPayment = () => {
        if (!isAuthenticated) {
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
                    )}
                    
                </div>

                <div className="col-span-1">
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h2 className="font-bold text-gray-800 mb-4">Resumen de Compra</h2>

                        <div className="flex items-center justify-between mb-4">
                            <div className="text-gray-800 font-medium">Arts. ({totalArts || 0})</div>
                            <div className="text-gray-800">{totalProd || 0}</div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <div className="text-gray-800 font-medium">Envio</div>
                            <div className="text-gray-800">0</div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <div className="font-bold text-gray-800">Total</div>
                            <div className="font-bold text-gray-800">{totalProd || 0}</div>
                        </div>

                        <button
                        onClick={() => {
                            handleProceedToPayment();
                            updateNombre(userInfo.nombre);
                            updateApellido(userInfo.apellido);
                        }}
                        className="transition duration-300 rounded-md py-2 px-4 text-white font-medium w-full"
                        style={{ backgroundColor: 'rgb(109, 1, 110)' }}
                        disabled={!isAuthenticated || !userInfo.nombre || !userInfo.apellido || !userInfo.correoElectronico || !userInfo.numeroTelefono || !userInfo.ciudad || !userInfo.provincia || !userInfo.codigoPostal || !userInfo.contraseña}
                    >
                        Continuar compra
                    </button>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <NavLink to="/catalogo">
                            <button style={{ backgroundColor: 'rgb(109, 1, 110)' }} className="transition duration-300 rounded-md py-2 px-4 text-white font-medium w-full">
                                Agregar articulos
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )

};

export default Carrito;