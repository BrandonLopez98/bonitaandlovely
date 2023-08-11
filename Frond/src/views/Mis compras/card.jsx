const ProductCard = ({ product }) => {
let image = "https://cdn2.primor.eu/media/catalog/product/cache/8d3aba296f7a18b5251ee30fa5db42b2/0/M/0ML19241_1_1c53.webp";

    return (
      <div className="flex flex-row justify-between p-4 my-4 bg-white rounded-lg shadow-lg">
        <div className="">
        <img src={image} alt={product.name} className="h-32 w-32 object-cover border-2 border-indigo-200 rounded-full" />
        </div>
        <div className="mt-4 flex-col ">
        <h1 className="text-lg text-center font-medium">{product.name}</h1>
        <p className="mt-1 text-md font-medium">Esta es una breve descripcion simulativa</p>
        </div>

        <div className="mt-4 flex ">
        <p className="mt-1 text-md font-medium">{product.price}</p>
        </div>
      </div>
    );
  };
  export default ProductCard