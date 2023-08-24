import ReviwerM from "../../components/modalReviwers/ReviwerM"
import ReviwerE from "../../components/modalReviwers/ReviwerE"
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
const ProductCard = ({ product }) => {
  const { user } = useAuth0();
  const usuarios = useSelector((state)=> state.Allclients);
  const currentUser = usuarios.find((usuario) => {
    return usuario.name.toLowerCase() === user.name.toLowerCase() && usuario.correo_electronico.toLowerCase() === user.email.toLowerCase();
  });
  console.log(currentUser);


  return (
    <div className="p-4 my-4 bg-white rounded-md shadow-md">
      <div className="flex flex-row items-center">
        <img src={product.imagenProducto} alt={product.productoName} className="h-24 w-24 object-cover border-2 border-indigo-200 rounded-md mr-4" />
        <div className="flex flex-row items-center justify-between w-full">
          <h1 className="text-lg capitalize font-medium">{product.productoName}</h1>
          <p className="text-sm font-medium text-right">Fecha de compra: {product.fechaCompra}</p>
        </div>
      </div>
      {/* <p className="mt-1 text-sm text-gray-600 font-medium">{product.description}</p> */}
      <hr className="my-4 border-gray-300 w-11/12 mx-auto" />
      <div className="flex justify-between">
        <p className="text-md font-medium">{product.productoPrecio}</p>
        {product.review ? (
          <ReviwerM product={product.id} currentUser={currentUser.id} />
        ) : (
          <ReviwerE  product={product.id} initialRating={product.review} initialComentario/>
        )}
      </div>
    </div>
  );
};
export default ProductCard;