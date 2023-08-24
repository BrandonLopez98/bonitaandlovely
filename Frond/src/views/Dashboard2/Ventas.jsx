import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ventas } from "../../redux/actions";

const VentasTable = () => {
  const dispatch = useDispatch()
  const [selectedVenta, setSelectedVenta] = useState(null);
  const stateVentas = useSelector(state => state.Allventas);
  useEffect(
    () => {
      dispatch(ventas())
    },[]
  );
  console.log(stateVentas);

  const handleVerClick = (venta) => {
    setSelectedVenta(venta);
  };

  const handleCloseModal = (e) => {
      setSelectedVenta(null);
  };

  return (
    <>
      {stateVentas?.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <div className="text-3xl text-gray-500 font-bold">No hay ventas aun...</div>
        </div>
      ) : (
        <table className="w-full rounded-lg overflow-hidden">
          <thead className="bg-gray-100 uppercase text-sm leading-normal">
            <tr className="text-gray-600">
              <th className="border-0 px-6 py-4 font-bold">Cliente</th>
              <th className="border-0 px-6 py-4 font-bold">Producto</th>
              <th className="border-0 px-6 py-4 font-bold">Monto</th>
              <th className="border-0 px-6 py-4 font-bold">Cantidad</th>
              <th className="border-0 px-6 py-4 font-bold">Fecha de compra</th>
              <th className="border-0 px-6 py-4 font-bold">Acción</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {stateVentas?.map((venta) => (
              <tr key={venta.cliente + venta.fecha} className="border-t">
                <td className="px-6 text-center py-10">{venta.clienteName}</td>
                <td className="px-6 text-center py-10">{venta.productoName}</td>
                <td className="px-6 text-center py-10">$ {venta.productoPrecio * venta.cantidad}</td>
                <td className="px-6 text-center py-10">{venta.cantidad} und</td>
                <td className="px-6 text-center py-10">{venta.fechaCompra}</td>
                <td className="px-6 text-center py-10">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleVerClick(venta)}
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedVenta && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4" onMouseDown={handleCloseModal}>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

            <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full max-h-screen z-10">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium capitalize text-gray-900">{selectedVenta.productoName}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{selectedVenta.clienteName}</p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Cliente</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedVenta.clienteName}</dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Producto</dt>
                    <dd className="mt-1 text-sm text-gray-900 capitalize sm:mt-0 sm:col-span-2">{selectedVenta.productoName}</dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Monto</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedVenta.productoPrecio * selectedVenta.cantidad}</dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Cantidad</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedVenta.cantidad} und</dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Fecha de compra</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedVenta.fechaCompra}</dd>
                  </div>
                  {/* ... más datos de ventas aquí */}
                </dl>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VentasTable;