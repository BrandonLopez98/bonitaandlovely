import Cards from "../../components/CatalogoComponen/Cards";
import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsCopy} from "../../redux/actions";
import Catalogfilters from "../../components/CatalogoComponen/Catalogfilters"

const Catalogo = () => {
  const stateProducts = useSelector((state) => state.copyAllProducts)
    const marcas = useSelector((state) => state.Allbrands);
    const categorias = useSelector((state) => state.Allcategories);
    // const searchName = useSelector((state) => state.searchResults);
    const dispatch = useDispatch();

  //     const [filterChanged, setFilterChanged] = useState(false);
  // const [disablePrev, setDisablePrev] = useState(true);
  // const [disableNext, setDisableNext] = useState(false);
  // const [pageNumber, setPageNumber] = useState(0);
  // const numberSize = 20;
  
    useEffect(() => {
      const page = 0 
      const size = 10; 
      const filters = {
        marcaId:marcas, 
        categoriaId:categorias, 
      };
  
      dispatch(productsCopy(page, size, filters));
    }, [dispatch]);

  // useEffect(() => {
  //   setDisablePrev(pageNumber <= 0);
  //   setDisableNext(pageNumber >= stateProducts.paginas - 1);
  // }, [pageNumber, stateProducts.paginas]);

  // const handlePageClick = (newPageNumber) => {
  //   // Limitar la navegación entre las páginas 1 y 3
  //   if (newPageNumber < 0) {
  //     newPageNumber = 0;
  //   } else if (newPageNumber > 2) {
  //     newPageNumber = 2;
  //   }
  //   setPageNumber(newPageNumber);
  //   const queries = {
  //     page: newPageNumber,
  //     size: numberSize
  //   };
  //   dispatch(products(queries));
  // };

  // const renderPageButtons = () => {
  //   const pages = [];
  //   for (let i = 0; i < 3; i++) {
  //     pages.push(
  //       <button
  //         key={i}
  //         className={`border-solid rounded border border-[255 255 255] px-3 py-1 mx-1 text-lg font-semibold text-slate-400 focus:text-slate-950 focus:border-slate-950 ${
  //           i === pageNumber ? "bg-slate-950 text-white" : ""
  //         }`}
  //         disabled={i === pageNumber || stateProducts.loading}
  //         onClick={() => handlePageClick(i)}
  //       >
  //         {i + 1}
  //       </button>
  //     );
  //   }
  //   return pages;
  // };


  


  return (
    <section>
      <div className="grid grid-cols-5 ">
        <div className="col-span-1 px-5">
          <Catalogfilters />
        </div>
        <div className="col-span-4 py-2 px-0 pr-20">
          {/* <div className="flex justify-center py-10">
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

         
          </div> */}

            <Cards stateProducts={stateProducts} />
           
         
        </div>
      </div>
    </section>
  );
};

export default Catalogo;
