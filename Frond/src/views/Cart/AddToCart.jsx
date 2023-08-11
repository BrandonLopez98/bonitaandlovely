import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCartProducts, addToCartFunction } from "../../redux/actions";
import { useEffect } from "react";
import greentick from '../../assets/img/greentick.png';
import MoreProductsCardContainer from "../../components/MoreProducts/MoreProductsContainer";
import OtherMoreProductsContainer from "../../components/MoreProducts/OtherMoreProductsContariner";

let image = "https://cdn2.primor.eu/media/catalog/product/cache/8d3aba296f7a18b5251ee30fa5db42b2/0/M/0ML19241_1_1c53.webp";

const AddToCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const stateProducts = useSelector(state => state.cartProducts);
  console.log(stateProducts);
  const { id, amount = 0 } = useParams();
  const searchParams = new URLSearchParams(location.search);
 
 //  const id = searchParams.get("id");
   //const amount = /*searchParams.get("amount") */ 2 ; 

  useEffect(() => {
    dispatch(getCartProducts(id, amount));
  }, [dispatch, id, amount]);

  const addToCart = () => {
    dispatch(addToCartFunction(id, amount)); 
    const carritotUrl = `/carrito/${id}`;
    navigate(carritotUrl);
  };

  return (
    <div className='flex flex-column items-center justify-center border border-black-500 border-5'>
      <div className='w-full h-full border border-black-500 border-500'>
        <div className='flex m-10 rounded-lg shadow-2xl p-20 justify-between items-center'>

          {stateProducts.productos && stateProducts.productos.map((item) => (
            <p key={item.id}>{item.name.toUpperCase()}</p>
          ))}
          <div className='flex items-center'>
            <div className='relative'>
              <img src={image /* stateProducts.imagen */} alt="Productimage" className='border border-green-500 w-20 h-20 object-cover rounded-full ml-10 mr-2' />
              <img src={greentick} alt="tick-image" className='w-10 h-10 object-cover rounded-full absolute bottom-0 right-0 m-0' />
            </div>
          </div>

          <div>
          <p className=' text-1xl font-bold'>{(stateProducts.name)}</p>
          <p className='text-green-500 font-semibold'>fue agregado al carrito exitosamente</p>
          </div>

          <p> Hay {amount} __ producto(s) en tu carrito </p>

          <div className="flex space-x-4">
          <button onClick={addToCart} className='bg-customColor text-white font-semibold py-1 px-4 rounded-xl flex items-center gap-2'>
            Ver carrito
          </button>

          <button onClick={addToCart} className='bg-customLightColor text-white font-semibold py-1 px-4 rounded-xl flex items-center gap-2'>
            Comprar carrito
          </button>
        </div>
        </div>

        <div className='flex flex-row gap-2 m-10 rounded-lg bg-fuchsia-200 p-10 justify-center items-center'>
          <MoreProductsCardContainer />
        </div>

        <div className='flex flex-row gap-2 m-10 rounded-lg p-10 shadow-2xl justify-center items-center'>
          <OtherMoreProductsContainer/>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
