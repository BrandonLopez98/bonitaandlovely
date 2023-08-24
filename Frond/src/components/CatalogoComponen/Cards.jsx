import { useSelector } from "react-redux";
import Card from "./Card";

const Cards = () => {
  const stateProducts = useSelector(state => state.copyAllProducts);
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-3 grid-auto-rows grid-rows-1 gap-5 ">
      {stateProducts && stateProducts.productos?.map(({ id, name, descripcion, precio_venta, imagenPrincipal }) => {
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