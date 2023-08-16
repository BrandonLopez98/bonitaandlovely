import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {emptyCartLS} from "../../redux/actions"
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const Carrito = () => {
    const dispatch = useDispatch();
    
    const cartLS = useSelector(state => state.localCart); //estos son los item en carrito en local/
    // const { user, isAuthenticated} = useAuth0();
    const user={id:2}

    console.log("cantidad de objetos en cartLs", cartLS.length);
    cartLS.forEach(elem=>{
        console.log("asi llega local cart a carrito");
        console.log(elem.id);
        console.log(elem.color);        
        console.log(elem.precio_venta);
        console.log(elem.amount);
    })



    const handleEmptyCart = () =>{
        dispatch(emptyCartLS());
    }        
    
   /* unificar amount de articulos start*/
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
        objeto: cart.find((item) => item.id === itemId && item.color === color),
        cantidad: countMap[itemKey],
        color: color,
      };
    });
  
    return cartUnifRes;
  };
  
/* unificar amount de articulos end*/

    const cartUnificado = cartUnif(cartLS); 
    // dispatch(addCartLSToApi(cartUnificado, user.id));   


   /* total costo x articulos */
   const totalProd = cartUnificado.reduce((total,item)=>total+(item.objeto.precio_venta * item.cantidad),0);

   /* total de articulos en carrito local*/
    const totalArts = cartUnificado.reduce((qty,item)=>qty+(item.cantidad),0);

    // const goPay = () =>{
    //     const cartToPay = `/carrito-${clienteId}`
    // }

    const handleProceedToPayment = () => {
        

        // axios.post('http://localhost:3001/pago', productToPay)
        //     .then((res) => (window.location.href = res.data.response.body.init_point));
    };
    
    return (
        <>        
            <div class="grid grid-cols-3 grid-rows-6 gap-5 mx-8 mt-6">
                {/* columna izquierda detallar productos en carrito */}  
                {cartUnificado && cartUnificado.length > 0 ? (
                <>
                {cartUnificado.map((item, index) => (
                    <div key={index} className="col-span-2 grid grid-cols-6 px-6 mx-6 shadow-md rounded-lg bg-fuchsia-200">
                <img src={item.objeto.imagenPrincipal} alt="fotoProducto" className="col-span-1 w-12 bg-white my-2 border-2 border-purple-300 justify-self-left" />
                
                <div class="col-start-2 col-span-3 place-self-center grid grid-rows-2">
                <div className="grid-row-1 font-medium">
                    {item.objeto.name}
                </div>
                <div className="grid-row-2 text-xs">
                    {item.color}
                </div>
                </div>
                
                <div className="col-start-5 col-span-1 flex items-center justify-center font-medium ">
                    <p class="text-xs mr-1">Cantidad: </p> {item.cantidad}
                </div>
                <div className="col-start-6 col-span-1 flex items-center justify-center font-medium ">
                    <p class="text-xs mr-1">Precio: </p>{item.objeto.precio_venta * item.cantidad}
                </div>
            </div>
        ))}
        <div class="col-start-2  flex justify-end h-6">          
            <button onClick={handleEmptyCart} class="rounded-md mx-6 px-2 text-gray-400 bg-gray-200 hover:bg-gray-100 font-small">
                Limpiar Carrito
            </button>
        </div>
        </>
    ) : (
        <div className="col-span-2 grid grid-cols-5 px-6 mx-6 shadow-md rounded-lg bg-fuchsia-200">
            <div className="col-start-2 col-span-3 flex items-center justify-center font-medium">
            No hay artículos en su carrito
            </div>
        </div>
    )}                     


    {/* columna derecha, total y boton a pasarela */}
                <div class="col-start-3 row-start-1 row-end-4 px-6 mx-6 rounded-lg bg-purple-200">

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

                        <button class="rounded-md row-start-6 place-self-center col-span-4 p-1.5 text-white bg-[#6b086f] hover:bg-[#7c4884]">
                            Continuar compra
                        </button>

                    </div>
                </div>
                <div class="col-start-3 col-end-4 row-start-4 row-end-4 col-span-1 flex place-self-center">
                <NavLink to="/catalogo">
                  <button class="rounded-md place-self-center p-1.5 text-white bg-[#6b086f] hover:bg-[#7c4884]"
                   >         
                    Agregar articulos
                  </button>
                </NavLink>
                </div>
            </div>
        </>
    )

    };

export default Carrito;



































































































// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {emptyCartLS} from "../../redux/actions"
// import { NavLink } from 'react-router-dom';

// const Carrito = () => {
//     const dispatch = useDispatch();
    
//     const cartLS = useSelector(state => state.localCart); //estos son los item en carrito en local/
//     cartLS.forEach(elem=>{
//         if (elem !== undefined && elem !== null){
//         console.log("cartLS",elem.name);        
//         console.log(elem.amount);
//     }})
    
//     const handleEmptyCart = () =>{
//         dispatch(emptyCartLS());
//     }        
    
//    /* unificar amount de articulos start*/
//    const cartUnif = (cart) =>{
//     const countMap = {};
//     const validItems = cart.filter(item => item !== undefined && item !== null);
 
//      cart.forEach(item=>{
//         if (item.id !== undefined && item.id !== null)  
//         {         
//          const itemId=item.id;       
//          if(countMap[itemId]){
//              countMap[itemId]+=item.amount;
//          }else{
//              countMap[itemId]=item.amount;
//          }             
//      }});     
//      const cartUnifRes = Object.keys(countMap).filter((itemId) => {
//         return cart.find((item) => item.id === itemId) !== undefined;
//       })
//         .map((itemId) => {
//           return {
//             objeto: cart.find((item) => item.id === itemId),
//             cantidad: countMap[itemId],
//           };
//         });    
//       return cartUnifRes;
//     };
// /* unificar amount de articulos end*/

//     const cartUnificado = cartUnif(cartLS);    


//    /* total costo x articulos */
//    const totalProd = cartUnificado.reduce((total,item)=>total+(item.objeto.precio_venta * item.cantidad),0);

//    /* total de articulos en carrito local*/
//     const totalArts = cartUnificado.reduce((qty,item)=>qty+(item.cantidad),0);
    
//     return (
//         <>        
//             <div class="grid grid-cols-3 grid-rows-6 gap-5 mx-8 mt-6">
//                 {/* columna izquierda detallar productos en carrito */}  
//                 {cartUnificado && cartUnificado.length > 0 ? (
//                 <>
//                 {cartUnificado.map((item, index) => (
//                     <div key={index} className="col-span-2 grid grid-cols-6 px-6 mx-6 shadow-md rounded-lg bg-fuchsia-200">
//                 <img src={item.objeto.imagenPrincipal} alt="fotoProducto" className="col-span-1 w-12 bg-white my-2 border-2 border-purple-300 justify-self-left" />
//                 <div className="col-start-2 col-span-3 place-self-center font-medium">
//                     {item.objeto.name}
//                 </div>
//                 <div className="col-start-5 col-span-1 flex items-center justify-center font-medium ">
//                     <p class="text-xs mr-1">Cantidad: </p> {item.cantidad}
//                 </div>
//                 <div className="col-start-6 col-span-1 flex items-center justify-center font-medium ">
//                     <p class="text-xs mr-1">Precio: </p>{item.objeto.precio_venta * item.cantidad}
//                 </div>
//             </div>
//         ))}
//         <div class="col-start-2  flex justify-end h-6">          
//             <button onClick={handleEmptyCart} class="rounded-md mx-6 px-2 text-gray-400 bg-gray-200 hover:bg-gray-100 font-small">
//                 Limpiar Carrito
//             </button>
//         </div>
//         </>
//     ) : (
//         <div className="col-span-2 grid grid-cols-5 px-6 mx-6 shadow-md rounded-lg bg-fuchsia-200">
//             <div className="col-start-2 col-span-3 flex items-center justify-center font-medium">
//             No hay artículos en su carrito
//             </div>
//         </div>
//     )}                     


//     {/* columna derecha, total y boton a pasarela */}
//                 <div class="col-start-3 row-start-1 row-end-4 px-6 mx-6 rounded-lg bg-purple-200">

//                     <div class="grid grid-cols-4 grid-rows-6 m-4">
//                         <h2 class="col-span-4 row-start-1 place-self-center font-medium">
//                             Resumen de Compra
//                         </h2>

//                         <h3 class="col-start-1 col-end-3 row-start-2 place-self-start">
//                         Arts. ({totalArts || 0})
//                         </h3>
//                         <h3 class="col-start-1 col-end-3 row-start-3 place-self-start">
//                             Envio
//                         </h3>
                        
//                         <h2 class="col-start-1 col-end-3 row-start-5 place-self-start font-bold">
//                             Total
//                         </h2>

//                         <h2 class="col-start-4 row-start-2 place-self-start">
//                         {totalProd || 0}
//                         </h2>
//                         <h2 class="row-start-3 col-start-4  place-self-start">
//                             0
//                         </h2>
//                         <h2 class="row-start-5 col-start-4  place-self-start font-bold">
//                         {totalProd || 0}
//                         </h2>

//                         <button class="rounded-md row-start-6 place-self-center col-span-4 p-1.5 text-white bg-[#6b086f] hover:bg-[#7c4884]">
//                             Continuar compra
//                         </button>

//                     </div>
//                 </div>
//                 <div class="col-start-3 col-end-4 row-start-4 row-end-4 col-span-1 flex place-self-center">
//                 <NavLink to="/catalogo">
//                   <button class="rounded-md place-self-center p-1.5 text-white bg-[#6b086f] hover:bg-[#7c4884]">
//                     Agregar articulos
//                   </button>
//                 </NavLink>
//                 </div>
//             </div>
//         </>
//     )

//     };

// export default Carrito;


































































































// import Navbar from "../../components/NavBar/NavBar";
// import Footer from "../../components/NavBar/NavBar";
// import { useState } from "react";
// import { useSelector } from "react-redux";

// const itemsDataH = [
//     {
//         "name": "Labial Glamour",
//         "descripcion": "Labial de larga duración y acabado mate",
//         "precio_compra": 879,
//         "porcentaje_ganancia": 40,
//         "precio_venta": 900,
//         "referencia_proveedor": "REF123",
//         "marcaId": 15,
//         "categoriaId": 3,
//         "tamañoId": 2,
//         "proveedorId": 6,
//         "subcategoriaId": [12, 9, 19, 16],
//         "imagenPrincipal": "https://i.ibb.co/rtVBNtx/labial-hidratante-glamour-filtro-solar-y-vit-e.png",
//         "imagenes": [20, 6, 38, 37]
//     },
//     {
//         "name": "Paleta Sombras Deluxe",
//         "descripcion": "Paleta de sombras con tonos brillantes y mate",
//         "precio_compra": 780,
//         "porcentaje_ganancia": 30,
//         "precio_venta": 792,
//         "referencia_proveedor": "REF456",
//         "marcaId": 8,
//         "categoriaId": 2,
//         "tamañoId": 2,
//         "proveedorId": 6,
//         "subcategoriaId": [8, 17, 3, 5],
//         "imagenPrincipal": "https://i.ibb.co/0sDQKvS/paleta-delux.jpg",
//         "imagenes": [
//             17, 13, 32, 23,
//             37, 28, 4
//         ]
//     },
//     {
//         "name": "Mascara Volumen Intenso",
//         "descripcion": "Mascara de pestañas que proporciona volumen intenso",
//         "precio_compra": 331,
//         "porcentaje_ganancia": 50,
//         "precio_venta": 610,
//         "referencia_proveedor": "REF789",
//         "marcaId": 20,
//         "categoriaId": 1,
//         "tamañoId": 1,
//         "proveedorId": 6,
//         "subcategoriaId": [6, 7, 2],
//         "imagenPrincipal": "https://ibb.co/Wt36Xcd",
//         "imagenes": [19, 29, 30, 3, 34, 8]
//     },
//     {
//         "name": "Base de Maquillaje Pro Cover",
//         "descripcion": "Base de maquillaje de alta cobertura y larga duración",
//         "precio_compra": 174,
//         "porcentaje_ganancia": 35,
//         "precio_venta": 495,
//         "referencia_proveedor": "REF246",
//         "marcaId": 12,
//         "categoriaId": 3,
//         "tamañoId": 2,
//         "proveedorId": 2,
//         "subcategoriaId": [12, 19, 9, 16],
//         "imagenPrincipal": "https://i.ibb.co/89jr7vN/Base-de-Maquillaje-Pro-Cover.jpg",
//         "imagenes": [32, 7]
//     },
//     {
//         "name": "Delineador Preciso",
//         "descripcion": "Delineador líquido con punta precisa para un acabado perfecto",
//         "precio_compra": 461,
//         "porcentaje_ganancia": 45,
//         "precio_venta": 708,
//         "referencia_proveedor": "REF753",
//         "marcaId": 5,
//         "categoriaId": 1,
//         "tamañoId": 2,
//         "proveedorId": 2,
//         "subcategoriaId": [10, 2, 7],
//         "imagenPrincipal": "https://i.ibb.co/Y7H31Wj/Delineador-Preciso.jpg",
//         "imagenes": [
//             16, 8, 22, 3,
//             25, 26, 32
//         ]
//     },
// ];

// const totalItemsCart = [1];


// const Carrito = () => {
//     // const [showItem, setShowItem] = useState(-1);
//     const cart = useSelector(state => state.cartProducts);
    
//     return (
//         <>        
//             <div class="grid grid-cols-3 grid-rows-6 gap-5 mx-8 mt-6">


//                 {/* columna izquierda detallar productos en carrito */}
//                 <div key={cart.id} class="col-span-2 grid grid-cols-6 px-6 mx-6 shadow-md rounded-lg bg-fuchsia-100">                    
//                     <img src={cart.imagenPrincipal} alt={cart.name} class="col-span-1 w-12 bg-white my-2 border-2 border-purple-300 justify-self-left" />

//                     <div class="col-start-2 col-span-2 place-self-center font-medium">
//                         {cart.name}
//                     </div>

//                     <div class="col-start-5 col-span-1 flex items-center justify-center font-small ">
//                     {/*{cart.amount}*/} <strong>1</strong> unidad(es)
//                     </div>

//                     <div class="col-start-6 col-span-1 flex items-center justify-center font-small ">
//                        <strong> ${cart.precio_venta} </strong> c/u
//                     </div>
//                 </div>
//                 {/* {itemsData.map((item, index) => (
//                     <div key={index} class="col-span-2 grid grid-cols-6 px-6 mx-6 shadow-md rounded-lg bg-fuchsia-200">
//                         <img src={item.imagenPrincipal} alt="fotoProducto" class="col-span-1 w-12 bg-white my-2 border-2 border-purple-300 justify-self-left" />
//                         <div class="col-start-2 col-span-3 place-self-center font-medium">
//                             {item.name}
//                         </div>
//                         <div class="col-start-5 col-span-1 flex items-center justify-center font-medium ">
//                             00
//                         </div>
//                         <div class="col-start-6 col-span-1 flex items-center justify-center font-medium ">
//                         {item.precio_venta * cantidad}
//                         </div>
//                     </div>
//                 ))} */}




//                 {/* columna derecha, total y boton a pasarela */}
//                 <div class="col-start-3 row-start-1 row-end-4 px-6 mx-6 rounded-lg bg-purple-200">

//                     <div class="grid grid-cols-4 grid-rows-6 m-4">
//                         <h2 class="col-span-4 row-start-1 place-self-center font-medium">
//                             Resumen de Compra
//                         </h2>

//                         <h3 class="col-start-1 col-end-3 row-start-2 place-self-start">
//                             Productos({totalItemsCart.length})
//                         </h3>
//                         <h3 class="col-start-1 col-end-3 row-start-3 place-self-start">
//                             Envio
//                         </h3>
//                         <h2 class="col-start-1 col-end-3 place-self-start">

//                         </h2>
//                         <h2 class="col-start-1 col-end-3 row-start-5 place-self-start font-bold">
//                             Total
//                         </h2>

//                         <h2 class="col-start-4 row-start-2 place-self-start">
//                         {cart.precio_venta}
//                         </h2>
//                         <h2 class="row-start-3 col-start-4  place-self-start">
//                             $$$$
//                         </h2>
//                         <h2 class="row-start-5 col-start-4  place-self-start font-bold">
//                         {cart.precio_venta}
//                         </h2>

//                         <button class="rounded-md row-start-6 place-self-center col-span-4 p-1.5 text-white bg-[#6b086f] hover:bg-[#7c4884]">
//                             Continuar compra
//                         </button>

//                     </div>
//                 </div>
//             </div>
//         </>
//     )

// };

// export default Carrito;