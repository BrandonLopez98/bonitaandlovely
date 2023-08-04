const Catalogfilters = () => {
    return (
      <div className="grid grid-cols-1 m-auto w-[80%] bg-white text-black py-10 text-lg capitalize justify-items-start">
        <h2 className="font-bold text-3xl">todos</h2>
        <p>5000 productos</p>
        <div className="pt-5">
          <h3 className="font-bold">categorias</h3>
          <ul>
            <li>
                <p>Cualquier departamento</p>
            </li>
            <li>
                <p>Cualquier departamento</p>
            </li>
            <li>
                <p>Cualquier departamento</p>
            </li>
            <li>
                <p>Cualquier departamento</p>
            </li>
            <li>
                <p>Cualquier departamento</p>
            </li>
          </ul>
        </div>
        <div className="grid grid-row-1 gap-5">
          <div><h2>precios:</h2>
          <button>$--- </button><span className="normal-case">a</span><button> $---(23) </button></div>
        </div>
        <div className="grid grid-cols-5">
          <input label="precio"  placeholder="maximo" type="text" className="border border-[255 255 255] px-1 col-span-2 rounded"/>
          <span className="m-auto col-span-1 px-5 font-bold">-</span>
          <input label="precio" type="text" placeholder="minimo" className=" border border-[255 255 255] px-1 col-span-2 rounded"/>
        </div>
      </div>
    );
  };
  
  export default Catalogfilters;
  