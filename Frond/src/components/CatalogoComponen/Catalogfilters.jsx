import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { brands, colors, sizes, productFilter, productsCopy} from "../../redux/actions";
import { useNavigate } from "react-router-dom";

const Catalogfilters = () => {
  const stateProducts = useSelector(state => state.Allproducts);
  const tallas = useSelector((state)=> state.Allsizes)
  const marcas = useSelector((state) => state.Allbrands)
  const categorias = useSelector((state)=> state.Allcategories)
  const productosFiltrados = useSelector((state)=> state.productsFiltered)
  const navigate = useNavigate()
  const [selectedFilters, setSelectedFilters] = useState(
    {
      precio_venta: "",
      marcaId: [],
      categoriaId: [],
      tamañoId: [],
    });

  const extractNumber = (string) => {
  const match = string.match(/\d+/); // Busca uno o más dígitos en la cadena
    return match ? parseInt(match[0]) : 0; // Convierte el resultado a un número o devuelve 0 si no hay coincidencia
  };
  
  const [minPrice, setMinPrice] = useState(""); 
  const [maxPrice, setMaxPrice] = useState("");
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(sizes())
    dispatch(colors())
    dispatch(brands())
    dispatch(productsCopy())
}, [dispatch])

useEffect(() => {
  console.log(selectedFilters);
  console.log(productosFiltrados)
}, [selectedFilters]);
    const total  = stateProducts.paginas * 10

    const handleFilterClick = () => {
    const minPriceValue = parseFloat(minPrice);
    const maxPriceValue = parseFloat(maxPrice);

    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      precio_venta: {
        min: isNaN(minPriceValue) ? "" : minPriceValue,
        max: isNaN(maxPriceValue) ? "" : maxPriceValue,
      },
    }));
      console.log(selectedFilters)
      dispatch(productFilter(selectedFilters))
    };

    const handleMultipleOptionChange = (propertyName, optionId) => {
      setSelectedFilters((prevFilters) => {
        const isAlreadySelected = prevFilters[propertyName].includes(optionId);
  
        if (isAlreadySelected) {
          return {
            ...prevFilters,
            [propertyName]: prevFilters[propertyName].filter((id) => id !== optionId),
          };
        } else {
          return {
            ...prevFilters,
            [propertyName]: [...prevFilters[propertyName], optionId],
          };
        }
      });
    }
    const handleReset = ()=>{
      window.location.reload();
    }
    return (
      <div className="grid grid-cols-1 m-auto w-[90%] bg-white text-black py-10 text-lg capitalize justify-items-start">
        <h2 className="font-bold text-2xl">todos</h2>
        <p>Productos {total}</p>
       
        {/* talla */}
        <div className="pt-5">
          <h3 className="font-bold">Talla</h3>
          <ul>
           {tallas && (
            tallas.map((talla)=>{
              const tallaNumber = extractNumber(talla.id)
              return <div className="flex">
              <li key={talla.id}>{talla.name}</li>
              <input
                className="m-1"
                type="checkbox"
                checked={selectedFilters.tamañoId.includes(tallaNumber)}
                onChange={() => handleMultipleOptionChange("tamañoId", tallaNumber)}
              />
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
              const marcaNumber = extractNumber(marca.id)
              return <div className="flex">
              <li key={marca.id}>{marca.name}</li>
              <input
                className="m-1"
                type="checkbox"
                checked={selectedFilters.marcaId.includes(marcaNumber)}
                onChange={() => handleMultipleOptionChange("marcaId", marcaNumber)}
              />
              </div>
            })
           )}
          </ul>
        </div>
        {/* color */}
        <div className="pt-5">
          <h3 className="font-bold">Categorias</h3>
          <ul>
           {categorias && (
            categorias.map((categoria)=>{
              const categoriaNumber = extractNumber(categoria.id)
              return <div className="flex">
                <li key={categoria.id}>{categoria.name}</li>
                <input
                className="m-1"
                type="checkbox"
                checked={selectedFilters.categoriaId.includes(categoriaNumber)}
                onChange={() => handleMultipleOptionChange("categoriaId", categoriaNumber)}
              />
              </div>
            })
           )}
          </ul>
        </div>

        {/* precios */}
        <div className="grid grid-row-1 gap-5">
          <div><strong>Precios:</strong>
        </div>
        </div>
        <div className="grid grid-cols-5">
          <input 
          label="precio"  
          placeholder="min" 
          type="number" 
          className="border border-[255 255 255] px-1 col-span-2 rounded"
          value={minPrice}
          onChange={(e) => {const value = parseFloat(e.target.value);
            setMinPrice(isNaN(value) || value < 0 ? 0 : value)}}/>
          <span className="m-auto col-span-1 px-5 font-bold">-</span>
          <input 
          label="precio" 
          type="number" 
          placeholder="max" 
          className=" border border-[255 255 255] px-1 col-span-2 rounded"
          value={maxPrice}
          onChange={(e) => {const value = parseFloat(e.target.value);
            setMaxPrice(isNaN(value) || value < 0 ? 0 : value)}}/>
        </div>

        <button 
        class=" h-10 px-10 font-semibold rounded-md bg-black mt-5  text-white" 
        type="submit"
        onClick={handleFilterClick}>
           Filtrar 
        </button>
        <button 
        class=" h-10 px-10 font-semibold rounded-md bg-black mt-5  text-white" 
        onClick={handleReset}>
           RESET
        </button>
      </div>
    );
  };
  
  export default Catalogfilters;
  