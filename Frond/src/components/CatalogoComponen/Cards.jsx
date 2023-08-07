import { useSelector } from "react-redux";
import Card from "./Card";
// Asegúrate de importar la acción adecuadamente

const Cards = ({stateProducts}) => {
  // Utilizamos directamente el estado "stateProducts" proveniente de Redux
const productosFiltrados = useSelector((state)=> state.productsFiltered)
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-auto-rows grid-rows-1 gap-5">
      {productosFiltrados.length>0? productosFiltrados.map(({id, name, descripcion, precio_venta}) => {
        return (
          <Card
            id={id}
            key={id}
            name={name}
            descripcion={descripcion}
            precio={precio_venta}
          />
        );
      }): stateProducts.productos?.map(({id, name, descripcion, precio_venta}) => {
        return (
          <Card
            id={id}
            key={id}
            name={name}
            descripcion={descripcion}
            precio={precio_venta}
          />
        );
      })}
    </div>
  );
};

export default Cards;
