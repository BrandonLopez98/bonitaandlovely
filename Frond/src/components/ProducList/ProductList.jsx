import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
  const [cart, setCart] = useState([]);
  
  const [products, setProducts] = useState([
    { id: 1, name: 'Producto 1', category: 'Labios', price: 10 },
    { id: 2, name: 'Producto 2', category: 'Ojos', price: 20 },
    { id: 3, name: 'Producto 3', category: 'Rostro', price: 15 },
    { id: 4, name: 'Producto 4', category: 'Labios', price: 12 },
    { id: 5, name: 'Producto 5', category: 'Ojos', price: 25 },
    { id: 6, name: 'Producto 6', category: 'Rostro', price: 18 },
  ]);

  const [filters, setFilters] = useState({
    category: '',
    price: '',
  });

  // Función para aplicar los filtros
  const applyFilters = () => {
    let filteredProducts = [...products];

    if (filters.category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filters.category
      );
    }

    if (filters.price) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= filters.price
      );
    }

    return filteredProducts;
  };

  const filteredProducts = applyFilters();

  const handleBuy = (product) => {
    setCart([...cart, product]);
  };

  const handleDelete = (product) => {
    const updatedProducts = products.filter((p) => p.id !== product.id);
    setProducts(updatedProducts);
  };

  useEffect(() => {
    const minPriceInput = document.getElementById("price-min");
    const maxPriceInput = document.getElementById("price-max");

    const handleMinPriceInput = () => {
      if (parseInt(minPriceInput.value) > parseInt(maxPriceInput.value)) {
        maxPriceInput.value = minPriceInput.value;
      }
    };

    const handleMaxPriceInput = () => {
      if (parseInt(maxPriceInput.value) < parseInt(minPriceInput.value)) {
        minPriceInput.value = maxPriceInput.value;
      }
    };

    minPriceInput.addEventListener("input", handleMinPriceInput);
    maxPriceInput.addEventListener("input", handleMaxPriceInput);

    return () => {
      minPriceInput.removeEventListener("input", handleMinPriceInput);
      maxPriceInput.removeEventListener("input", handleMaxPriceInput);
    };
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-4">Productos</h2>
      <div className="flex flex-wrap mb-4">
        <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
          <label htmlFor="category-filter" className="block font-bold mb-2">Categoría:</label>
          <select
            id="category-filter"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="">Todos</option>
            <option value="Labios">Labios</option>
            <option value="Ojos">Ojos</option>
            <option value="Rostro">Rostro</option>
          </select>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <label htmlFor="price-filter" className="block font-bold mb-2">Precio máximo:</label>
          <input
            type="number"
            id="price-filter"
            value={filters.price}
            onChange={(e) =>
              setFilters({ ...filters, price: e.target.value })
            }
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <label htmlFor="price-min" className="block font-bold mb-2">Precio mínimo:</label>
          <input
            type="number"
            id="price-min"
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <label htmlFor="price-max" className="block font-bold mb-2">Precio máximo:</label>
          <input
            type="number"
            id="price-max"
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-2">
        {filteredProducts.map((product) => (
          <div key={product.id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
            <div className="max-w-xs rounded overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-110 transition duration-500">
              <img className="w-full" src="https://via.placeholder.com/350x150" alt="Producto" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.name}</div>
                <p className="text-gray-700 text-base">Precio: ${product.price}</p>
              </div>
              <div className="px-6 py-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => handleBuy(product)}>Comprar</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => handleDelete(product)}>Eliminar</button>
                <Link to={`/productos/${product.id}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Detalle del producto</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;