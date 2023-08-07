import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";


const Card = ({id,name, precio_venta }) => {
  //agregar la ruta de los detalles de cada card
  //en la to = "ruta de detalle"
  return (
    <div className="grid grid-cols-1 rounded-lg bg-white px-5 py-10 relative shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]" >
      <button><AiFillHeart className="absolute overflow-hidden group hover:scale-125 transition-transform duration-300 transform right-2 top-2 text-2xl text-slate-400" /></button>
      <Link to={`detail/${id}`} className="w-[50%] h-full m-auto"><img className="rounded-lg w-full m-auto shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]" src="https://i.ibb.co/ctpR3L1/img158.jpg" alt="a" /></Link>
      <h2 className="pt-5 font-bold capitalize text-xl">{name}</h2>
      <p className="font-semibold text-lg pb-5">{precio_venta}</p>
      <button className="bg-black rounded-lg py-3 px-5 m-auto hover:bg-slate-500 transition-colors text-white">agregar a mi bolsa</button>
    </div>
  );
};

export default Card;
