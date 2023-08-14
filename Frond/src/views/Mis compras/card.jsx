const ProductCard = ({ product }) => {

    return (
      <div className="flex flex-row justify-between p-4 my-4 bg-white rounded-lg shadow-lg">
        <div className="">
        <img src={product.imgSrc} alt={product.name} className="h-32 w-32 object-cover border-2 border-indigo-200 rounded-full" />
        </div>
        <div className="mt-4 flex-col ">
        <h1 className="text-lg mr-20 text-center font-medium">{product.name}</h1>
        <p className="mt-1 mr-20 text-md font-medium">Esta es una breve descripcion simulativa</p>
        </div>

        <div className="mt-4 flex ">
        <p className="mt-1 text-md font-medium">{product.price}</p>
        </div>
      </div>
    );
  };
  export default ProductCard