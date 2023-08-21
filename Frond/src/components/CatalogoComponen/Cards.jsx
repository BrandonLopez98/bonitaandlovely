import { useSelector } from "react-redux";
import Card from "./Card";

const Cards = ({ stateProducts }) => {
  const productosFiltrados = useSelector((state) => state.productsFiltered);
  const searchResults = useSelector((state) => state.searchResults); 

  
  const productListToRender = searchResults.length > 0 ? searchResults : stateProducts.productos;

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-auto-rows grid-rows-1 gap-5">
      {productListToRender?.map(({ id, name, descripcion, precio_venta, imagenPrincipal }) => {
        return (
          <Card
            id={id}
            key={id}
            name={name}
            descripcion={descripcion}
            precio={precio_venta}
            imagenPrincipal={imagenPrincipal}
          />
        );
      })}
    </div>
  );
};

export default Cards;
