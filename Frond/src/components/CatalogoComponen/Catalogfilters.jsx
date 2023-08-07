import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { brands, colors, sizes } from "../../redux/actions";

const Catalogfilters = () => {
  const stateProducts = useSelector(state => state.Allproducts);
  const tallas = useSelector((state)=> state.Allsizes)
  const marcas = useSelector((state) => state.Allbrands)
  const colores = useSelector((state)=> state.Allcolors)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(sizes())
    dispatch(colors())
    dispatch(brands())
}, [dispatch])

    const total  = stateProducts.paginas * 10


    return (
      <div className="grid grid-cols-1 m-auto w-[90%] bg-white text-black py-10 text-lg capitalize justify-items-start">
        <h2 className="font-bold text-2xl">todos</h2>
        <p>productos {total}</p>
       
        {/* talla */}
        <div className="pt-5">
          <h3 className="font-bold">Talla</h3>
          <ul>
           {tallas && (
            tallas.map((talla)=>{
              return <div className="flex">
              <li key={talla.id}>{talla.name}</li>
              <input className="m-1" type="checkbox" name="" id="" />
              </div>
            })
           )}
          </ul>
        </div>
        {/* marca */}
        <div className="pt-5">
          <h3 className="font-bold">Marca</h3>
          <ul>
           {marcas && (
            marcas.map((marca)=>{
              return <div className="flex">
              <li key={marca.id}>{marca.name}</li>
              <input className="m-1" type="checkbox" name="" id="" />
              </div>
            })
           )}
          </ul>
        </div>
        {/* color */}
        <div className="pt-5">
          <h3 className="font-bold">Color</h3>
          <ul>
           {colores && (
            colores.map((color)=>{
              return <div className="flex">
                <li key={color.name}>{color.name}</li>
                <input className="m-1" type="checkbox" name="" id="" />
              </div>
            })
           )}
          </ul>
        </div>

        {/* precios */}
        <div className="grid grid-row-1 gap-5">
          <div><strong>Precios:</strong>
          <button>$--- </button><span className="normal-case">a</span><button> $---(23) </button></div>
        </div>
        <div className="grid grid-cols-5">
          <input label="precio"  placeholder="maximo" type="text" className="border border-[255 255 255] px-1 col-span-2 rounded"/>
          <span className="m-auto col-span-1 px-5 font-bold">-</span>
          <input label="precio" type="text" placeholder="minimo" className=" border border-[255 255 255] px-1 col-span-2 rounded"/>
        </div>

        <button class=" h-10 px-10 font-semibold rounded-md bg-black mt-5  text-white" type="submit">
           Filtrar 
          </button>
      </div>
    );
  };
  
  export default Catalogfilters;
  