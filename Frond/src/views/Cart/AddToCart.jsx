import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCartFunction } from "../../redux/actions";
import bagIcon from '../../assets/img/baghandleWhite.svg';

let image  = "https://cdn2.primor.eu/media/catalog/product/cache/8d3aba296f7a18b5251ee30fa5db42b2/0/M/0ML19241_1_1c53.webp";

const AddToCart = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const stateProducts = useSelector(state => state.cartProducts);
    const searchParams = new URLSearchParams(location.search);

    const id = searchParams.get("id");
    const quantity = searchParams.get("quantity");

        const addToCart = () => {
            dispatch(addToCartFunction(id, quantity));
        const carritotUrl = `/carrito/${id}`;
        navigate(carritotUrl)
        };

            // border border-blue-500 border-5 rounded-lg'

  return (

    <div className='flex flex-row justify-between m-10 border border-blue-500 border-5' >
      <div className='flex flex-row justify-between p-10 border border-green-500 border-5 rounded-lg bg-pink-500'>
        {stateProducts.productos && stateProducts.productos.map((item) => (
          <p key={item.id}>{item.name.toUpperCase()}</p>
        ))}
      </div>
      <img src={ image /* stateProducts.imagen */} alt="Productimage" className='w-20 h-20 object-cover rounded-full ml-10' />
      <h1>Has agregado el producto  </h1>
      <h1 className='text-5xl font-bold'>{stateProducts.name}</h1>
      <button onClick={addToCart} className='bg-customColor text-white font-semibold py-3 px-14 rounded-xl h-full flex items-center gap-2'>
        <img src={bagIcon} alt="bag icon" className="w-6 h-6 " />
        Ver carrito
      </button>
    </div>

  );
};

export default AddToCart;