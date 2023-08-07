import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
const Sidebar = ({ filters, onFilterChange, isHomePage }) => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked ? [...(prevFilters[name] || []), value] : prevFilters[name].filter((val) => val !== value),
    }));
  };

// function handleClick() {
//   history.push('/catalogo');
// }

  const applyFilters = () => {
    if (typeof onFilterChange === 'function') {
      onFilterChange(selectedFilters);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {isHomePage ? null : (
        <button
          onClick={() => history.push('/categorias')}
          className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-500 absolute top-0 right-0 mt-4 mr-4"
        >
          Filtrar
        </button>
      )}
      {isOpen && (
        <div className="sidebar bg-white rounded-lg shadow-lg p-6 absolute top-0 right-0 mt-16 mr-4 z-10">
          <h2 className="text-gray-700 font-bold text-lg mb-4">Filtrar por:</h2>
          {/* ... */}
          {isHomePage && (
            <button
              onClick={applyFilters}
              className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-500"
            >
              Aplicar filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;