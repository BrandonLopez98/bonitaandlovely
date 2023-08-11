import Navbar from "../../components/NavBar/NavBar";
import Footer from "../../components/NavBar/NavBar";
import { useState } from "react";
import { useSelector } from "react-redux";

const itemsDataH = [
    {
        "name": "Labial Glamour",
        "descripcion": "Labial de larga duración y acabado mate",
        "precio_compra": 879,
        "porcentaje_ganancia": 40,
        "precio_venta": 900,
        "referencia_proveedor": "REF123",
        "marcaId": 15,
        "categoriaId": 3,
        "tamañoId": 2,
        "proveedorId": 6,
        "subcategoriaId": [12, 9, 19, 16],
        "imagenPrincipal": "https://i.ibb.co/rtVBNtx/labial-hidratante-glamour-filtro-solar-y-vit-e.png",
        "imagenes": [20, 6, 38, 37]
    },
    {
        "name": "Paleta Sombras Deluxe",
        "descripcion": "Paleta de sombras con tonos brillantes y mate",
        "precio_compra": 780,
        "porcentaje_ganancia": 30,
        "precio_venta": 792,
        "referencia_proveedor": "REF456",
        "marcaId": 8,
        "categoriaId": 2,
        "tamañoId": 2,
        "proveedorId": 6,
        "subcategoriaId": [8, 17, 3, 5],
        "imagenPrincipal": "https://i.ibb.co/0sDQKvS/paleta-delux.jpg",
        "imagenes": [
            17, 13, 32, 23,
            37, 28, 4
        ]
    },
    {
        "name": "Mascara Volumen Intenso",
        "descripcion": "Mascara de pestañas que proporciona volumen intenso",
        "precio_compra": 331,
        "porcentaje_ganancia": 50,
        "precio_venta": 610,
        "referencia_proveedor": "REF789",
        "marcaId": 20,
        "categoriaId": 1,
        "tamañoId": 1,
        "proveedorId": 6,
        "subcategoriaId": [6, 7, 2],
        "imagenPrincipal": "https://ibb.co/Wt36Xcd",
        "imagenes": [19, 29, 30, 3, 34, 8]
    },
    {
        "name": "Base de Maquillaje Pro Cover",
        "descripcion": "Base de maquillaje de alta cobertura y larga duración",
        "precio_compra": 174,
        "porcentaje_ganancia": 35,
        "precio_venta": 495,
        "referencia_proveedor": "REF246",
        "marcaId": 12,
        "categoriaId": 3,
        "tamañoId": 2,
        "proveedorId": 2,
        "subcategoriaId": [12, 19, 9, 16],
        "imagenPrincipal": "https://i.ibb.co/89jr7vN/Base-de-Maquillaje-Pro-Cover.jpg",
        "imagenes": [32, 7]
    },
    {
        "name": "Delineador Preciso",
        "descripcion": "Delineador líquido con punta precisa para un acabado perfecto",
        "precio_compra": 461,
        "porcentaje_ganancia": 45,
        "precio_venta": 708,
        "referencia_proveedor": "REF753",
        "marcaId": 5,
        "categoriaId": 1,
        "tamañoId": 2,
        "proveedorId": 2,
        "subcategoriaId": [10, 2, 7],
        "imagenPrincipal": "https://i.ibb.co/Y7H31Wj/Delineador-Preciso.jpg",
        "imagenes": [
            16, 8, 22, 3,
            25, 26, 32
        ]
    },
];

const cantidad = 1;


const Carrito = () => {
    // const [showItem, setShowItem] = useState(-1);
    const cart = useSelector(state => state.cartProducts);
    console.log("este es el cartproducts");
    console.log(typeof cart);
    console.log(cart);
    return (
        <>        
            <div class="grid grid-cols-3 grid-rows-6 gap-5 mx-8 mt-6">


                {/* columna izquierda detallar productos en carrito */}
                <div key={cart.id} class="col-span-2 grid grid-cols-6 px-6 mx-6 shadow-md rounded-lg bg-fuchsia-200">
                    <img src={cart.imagenPrincipal} alt={cart.name} class="col-span-1 w-12 bg-white my-2 border-2 border-purple-300 justify-self-left" />
                    <div class="col-start-2 col-span-3 place-self-center font-medium">
                        {cart.name}
                    </div>
                    {/* <p>Cantidad: {item.quantity}</p> */}

                    <div class="col-start-6 col-span-1 flex items-center justify-center font-medium ">
                        Precio: {cart.precio_venta}
                    </div>
                </div>
                {/* {itemsData.map((item, index) => (
                    <div key={index} class="col-span-2 grid grid-cols-6 px-6 mx-6 shadow-md rounded-lg bg-fuchsia-200">
                        <img src={item.imagenPrincipal} alt="fotoProducto" class="col-span-1 w-12 bg-white my-2 border-2 border-purple-300 justify-self-left" />
                        <div class="col-start-2 col-span-3 place-self-center font-medium">
                            {item.name}
                        </div>
                        <div class="col-start-5 col-span-1 flex items-center justify-center font-medium ">
                            00
                        </div>
                        <div class="col-start-6 col-span-1 flex items-center justify-center font-medium ">
                        {item.precio_venta * cantidad}
                        </div>
                    </div>
                ))} */}




                {/* columna derecha, total y boton a pasarela */}
                <div class="col-start-3 row-start-1 row-end-4 px-6 mx-6 rounded-lg bg-purple-200">

                    <div class="grid grid-cols-4 grid-rows-6 m-4">
                        <h2 class="col-span-4 row-start-1 place-self-center font-medium">
                            Resumen de Compra
                        </h2>

                        <h3 class="col-start-1 col-end-3 row-start-2 place-self-start">
                            Productos ({cart.length})
                        </h3>
                        <h3 class="col-start-1 col-end-3 row-start-3 place-self-start">
                            Envio
                        </h3>
                        <h2 class="col-start-1 col-end-3 place-self-start">

                        </h2>
                        <h2 class="col-start-1 col-end-3 row-start-5 place-self-start font-bold">
                            Total
                        </h2>

                        <h2 class="col-start-4 row-start-2 place-self-start">
                        {cart.precio_venta}
                        </h2>
                        <h2 class="row-start-3 col-start-4  place-self-start">
                            $$$$
                        </h2>
                        <h2 class="row-start-5 col-start-4  place-self-start font-bold">
                        {cart.precio_venta}
                        </h2>

                        <button class="rounded-md row-start-6 place-self-center col-span-4 p-1.5 text-white bg-[#6b086f] hover:bg-[#7c4884]">
                            Continuar compra
                        </button>

                    </div>
                </div>
            </div>
        </>
    )

};

export default Carrito;