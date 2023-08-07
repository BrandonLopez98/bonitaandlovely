import Cards from "../../components/CatalogoComponen/Cards";
import { useEffect, useState } from "react";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Catalogfilters from "../../components/CatalogoComponen/Catalogfilters";
import { products } from "../../redux/actions";
const Catalogo = () => {
  const stateProducts = useSelector(state => state.Allproducts);
  const [disableTF, setDisableTF] = useState(true);
  const [pageNumberNx, setPageNumberNx] = useState(0); // Corregir nombre de variable
  const numberSize = 10;
  console.log(stateProducts);

  const dispatch = useDispatch();
  console.log(disableTF)
   const handlerNext = () => {
    pageNumberNx < stateProducts.paginas -1 ? setPageNumberNx(prevNext => prevNext + 1) : setDisableTF(false)
  };

  const handlerPrev = () => {
    pageNumberNx > 0 ? setPageNumberNx(pageNumberNx - 1) : setDisableTF(false);
  };

  useEffect(
    () => {
      const fetchData = () => {
        const queries = {
          page: pageNumberNx,
          size: numberSize
        };

        dispatch(products(queries));
      };

      fetchData();
      setDisableTF(pageNumberNx <= 0 || pageNumberNx >= stateProducts.paginas - 1);
    },
    [dispatch, pageNumberNx, numberSize, stateProducts.paginas]
  );

  return (
    <section>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1 px-10">
          <Catalogfilters />
        </div>
        <div className="col-span-4 py-10 px-10">
          <div className="grid grid-cols-2 pb-10 justify-items-center	">
            <p className="col-span-1 px-3 text-lg">
              <span className="font-bold">300</span> resultados para --
            </p>
            <select className="col-span-1 text-lg border-solid rounded border border-[255 255 255] px-2 py-[0.2rem] text-slate-400 focus:text-slate-950 focus:border-slate-950">
              <option value="selecciona una opcion">
                selecciona una opcion.
              </option>
              <option value="a">a</option>
              <option value="a">a</option>
            </select>
          </div>
          <Cards stateProducts={stateProducts} />
        </div>
        <div className="grid grid-cols-2 justify-items-center w-[30%] m-auto py-10">
        <button
          onClick={handlerPrev}
          className="mx-1 text-3xl"
        >
          <BsFillArrowLeftSquareFill />
        </button>
        <button
          onClick={handlerNext}
        
          className="mx-1 text-3xl"
        >
          <BsFillArrowRightSquareFill />
        </button>
      </div>
      </div>
      </section>
    );
  };
  
  export default Catalogo;
  