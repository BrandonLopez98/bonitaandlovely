import Navbar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useState } from "react";

const itemsData = [
    {
        articulo:"labial"
    },
    
    {
        articulo:"brocha"
    },
    {
        articulo:"rubor"
    },
    {
        articulo:"locion"
    },
    {
        articulo:"patitos"
    }
];


const Carrito = () => {
    const [showItem, setShowItem] = useState(-1);

    return (
        <>
            
            <div class="grid grid-cols-3 grid-rows-6 gap-5 mx-8 mt-6">
                {/* columna izquierda detallar productos en carrito */}
                {itemsData.map((item, index) => (
                    <div key={index} class="col-span-2 px-6 mx-6 shadow-md rounded-lg bg-fuchsia-200">
                        {item.articulo}
                    </div>
                ))}

                {/* columna derecha, total y boton a pasarela */}
                <div class="col-start-3 row-start-1 row-end-6 px-6 mx-6 rounded-lg bg-purple-200">

                    <div class="grid grid-cols-4 grid-rows-6 m-4">
                    <h2 class="col-span-4 row-start-1 place-self-center font-medium">
                        Resumen de Compra
                    </h2>
                    
                    <h3 class="col-start-1 col-end-3 row-start-2 place-self-start">
                        Productos ({itemsData.length})
                    </h3>
                    <h3 class="col-start-1 col-end-3 row-start-3 place-self-start">
                        Envio
                    </h3>
                    <h2 class="col-start-1 col-end-3 place-self-start">
                        
                    </h2>
                    <h2 class="col-start-1 col-end-3 row-start-5 place-self-start font-bold">
                        Total
                    </h2>

                    <h2 class="row-start-2 col-start-4  place-self-end">
                        $$$$
                    </h2>
                    <h2 class="row-start-3 col-start-4  place-self-end">
                        $$$$
                    </h2>
                    <h2 class="row-start-5 col-start-4  place-self-end font-bold">
                        $$$$
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