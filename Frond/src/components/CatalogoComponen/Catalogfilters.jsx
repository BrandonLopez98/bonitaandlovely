import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { brands, categories, productFilter, productsCopy } from "../../redux/actions";

const Catalogfitlers = () => {
  const stateProducts = useSelector(state => state.copyAllProducts);
  const marcas = useSelector((state) => state.Allbrands)
  const categorias = useSelector((state) => state.Allcategories)
  const [filterChanged, setFilterChanged] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(
    {
      precio_venta: "",
      marcaId: [],
      categoriaId: [],
      tamañoId: [],
    });
  console.log(selectedFilters)
  const extractNumber = (string) => {
    const match = string.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const dispatch = useDispatch()

  useEffect(() => {
    const page = 0
    const size = 60;
    const filters = {
      marcaId: selectedFilters.marcaId[0],
      categoriaId: selectedFilters.categoriaId[0]
    };
    dispatch(productsCopy(page, size, filters));
    dispatch(categories())
    dispatch(brands())
  }, [dispatch, selectedFilters])
  console.log(`esto es de catologo : ${categorias} , ${marcas}`)


  const total = stateProducts.productos?.length * stateProducts.paginas;

  const handleSingleOptionChange = (propertyName, optionId) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [propertyName]: [optionId],
    }));
    setFilterChanged(true);
  }

  useEffect(() => {

    if (stateProducts.productos?.length > 0) {
      const filteredCategoriaId = stateProducts.productos.map(producto => producto.categoriaId);

      setSelectedFilters(prevFilters => ({
        ...prevFilters,
        categoriaId: filteredCategoriaId,

      }));
    }
  }, []);

  // useEffect(() => {
  //   if (
  //     (!selectedFilters.tamañoId.length &&
  //       !selectedFilters.marcaId.length &&
  //       !selectedFilters.categoriaId.length &&
  //       selectedFilters.precio_venta.min === "" &&
  //       selectedFilters.precio_venta.max === "")
  //   ) {
  //     dispatch(productFilter({
  //       precio_venta: {
  //         min: null,
  //         max: null,
  //       },
  //       marcaId: [],
  //       categoriaId: [],
  //       tamañoId: [],
  //     }))
  //   } else if (filterChanged) {
  //     dispatch(productFilter(selectedFilters));
  //     setFilterChanged(false);
  //   }
  // }, [selectedFilters, filterChanged]);

  const handleReset = () => {
    window.location.reload();
  }

  return (
    <div className="grid grid-cols-1 w-4/5 my-10 mx-auto bg-white text-black py-10 text-lg capitalize justify-items-start  rounded-md">
      <h2 className="font-bold text-2xl mb-5">Total <br /> {total} productos</h2>
      {/* Marca */}
      <div>
        <h3 className="font-bold mb-2">Marca</h3>
        <ul>
          {marcas &&
            marcas.map(marca => {
              const marcaNumber = extractNumber(marca.id);
              return (
                <li key={marca.id} className="flex items-center mb-2">
                  <input
                    className="mr-2"
                    type="checkbox"
                    checked={selectedFilters.marcaId[0] === marcaNumber}
                    onChange={() =>
                      handleSingleOptionChange("marcaId", marcaNumber)
                    }
                  />

                  <span>{marca.name}</span>
                </li>
              );
            })}
        </ul>
      </div>

      {/* Categorias */}
      <div>
        <h3 className="font-bold mb-2">Categorías</h3>
        <ul>
          {categorias &&
            categorias.map(categoria => {
              const categoriaNumber = extractNumber(categoria.id);
              return (
                <li key={categoria.id} className="flex items-center mb-2">
                  <input
                    className="mr-2"
                    type="checkbox"
                    checked={selectedFilters.categoriaId[0] === categoriaNumber}
                    onChange={() =>
                      handleSingleOptionChange("categoriaId", categoriaNumber)
                    }
                  />

                  <span>{categoria.name}</span>
                </li>
              );
            })}
        </ul>
      </div>

      {/* Precios */}
      <div>
        <h3 className="font-bold mb-2">Precios</h3>
        <div className="grid grid-cols-5 mb-2">
          <div className="col-span-2">
            <input
              label="precio"
              placeholder="min"
              type="number"
              className="border border-gray-300 px-2 py-1 rounded w-full"
              value={minPrice}
              onChange={e => {
                const value = parseFloat(e.target.value);
                setMinPrice(isNaN(value) || value < 0 ? 0 : value);
              }}
            />
          </div>
          <div className="flex items-center justify-center font-bold">
            -
          </div>
          <div className="col-span-2">
            <input
              label="precio"
              placeholder="max"
              type="number"
              className="border border-gray-300 px-2 py-1 rounded w-full"
              value={maxPrice}
              onChange={e => {
                const value = parseFloat(e.target.value);
                setMaxPrice(isNaN(value) || value < 0 ? 0 : value);
              }}
            />
          </div>
        </div>
      </div>

      {/* Botón RESET */}
      <div className="flex justify-center">
        <button
          className="px-8 py-2 mt-5 font-semibold rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300"
          onClick={handleReset}
        >
          RESET
        </button>
      </div>
    </div>
  );
};

export default Catalogfitlers;
