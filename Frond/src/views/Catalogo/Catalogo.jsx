import Cards from "../../components/CatalogoComponen/Cards";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Catalogfilters from "../../components/CatalogoComponen/Catalogfilters";
import { products } from "../../redux/actions";

const Catalogo = () => {
  const stateProducts = useSelector(state => state.Allproducts);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const numberSize = 20;
  console.log(stateProducts)

  const dispatch = useDispatch();

  useEffect(() => {
    setPageNumber(0);
    const fetchData = () => {
      const queries = {
        page: 0,
        size: numberSize
      };
      dispatch(products(queries));
    };
    fetchData();
  }, [dispatch, numberSize]);

  useEffect(() => {
    setDisablePrev(pageNumber <= 0);
    setDisableNext(pageNumber >= stateProducts.paginas - 1);
  }, [pageNumber, stateProducts.paginas]);

  const handlePageClick = (newPageNumber) => {
    setPageNumber(newPageNumber);
    const queries = {
      page: newPageNumber,
      size: numberSize
    };
    dispatch(products(queries));
  };

  const renderPageButtons = () => {
    const pages = [];
    for (let i = 0; i < stateProducts.paginas; i++) {
      pages.push(
        <button
          key={i}
          className={`border-solid rounded border border-[255 255 255] px-3 py-1 mx-1 text-lg font-semibold text-slate-400 focus:text-slate-950 focus:border-slate-950 ${
            i === pageNumber ? "bg-slate-950 text-white" : ""
          }`}
          disabled={i === pageNumber || stateProducts.loading}
          onClick={() => handlePageClick(i)}
        >
          {i + 1}
        </button>
      );
    }
    return pages;
  };


  


  return (
    <section>
      <div className="grid grid-cols-5 ">
        <div className="col-span-1 px-5">
          <Catalogfilters />
        </div>
        <div className="col-span-4 py-2 px-0 pr-20">
          <div className="flex justify-center py-10">
            <button
              disabled={disablePrev || stateProducts.loading}
              onClick={() => handlePageClick(pageNumber - 1)}
              className="mx-1 text-3xl"
            >
              {"<"}
            </button>
            {renderPageButtons()}
            <button
              disabled={disableNext || stateProducts.loading}
              onClick={() => handlePageClick(pageNumber + 1)}
              className="mx-1 text-3xl"
            >
              {">"}
            </button>

         
          </div>

            <Cards stateProducts={stateProducts} />
           
         
        </div>
      </div>
    </section>
  );
};

export default Catalogo;
