import React from 'react';
import { FaStar } from 'react-icons/fa';

const Reviews = () => {
  return (
    <div className="m-20 o-container o-container-c6db03c7-480f-45b0-97dc-f35f1973608b container sb-9963253-pt-5 sb-9963253-pb-5 lg:sb-9963253-pt-8 lg:sb-9963253-pb-8 sb-5472269-flex sb-5472269-flex-col sb-5472269-items-center sb-5472269-gap-4 lg:sb-5472269-gap-6 container-reviews mx-auto">
    <div className="mb-8 text-center md:mb-16">
      <p className="mb-1 md:mb-5">
        <span className="text-4xl font-bold text-black">Tu opinión nos importa</span>
      </p>
    </div>
    <div className="grid grid-cols-1 gap-6 md:gap-12 md:grid-cols-3">
        
        {/* Review 1 */}
        <div className="relative">
          <div className="flex flex-row flex-nowrap items-center justify-between gap-x-4 px-4">
            <span className="text-xl text-gray-dark">29/07/2023</span>
             <div style={{ display: 'flex', gap: '4px', color: '#B061B2' }}>
                <FaStar size={15} />
                <FaStar size={15} />
                <FaStar size={15} />
                <FaStar size={15} />
                <FaStar size={15} />
              </div>
          </div>
          <div className="py-4 px-5 mt-2 border border-gray rounded-lg">
            <p className="text-xl text-gray-dark">Estoy muy contenta con la calidad de mi producto! Recomiendo!</p>
          </div>
        </div>

        {/* Review 2 */}
        <div className="relative">
          <div className="flex flex-row flex-nowrap items-center justify-between gap-x-4 px-4">
            <span className="text-xl text-gray-dark">27/07/2023</span>
            <div style={{ display: 'flex', gap: '4px', color: '#B061B2' }}>
                <FaStar size={15} />
                <FaStar size={15} />
                <FaStar size={15} />
                <FaStar size={15} />
                <FaStar size={15} />
              </div>
          </div>
          <div className="py-4 px-5 mt-2 border border-gray rounded-lg">
            <p className="text-xl text-gray-dark">El tiempo de entrega fue el acordado!</p>
          </div>
        </div>

        {/* Review 3 */}
        <div className="relative">
          <div className="flex flex-row flex-nowrap items-center justify-between gap-x-4 px-4">
            <span className="text-xl text-gray-dark">19/07/2023</span>
            <div style={{ display: 'flex', gap: '4px', color: '#B061B2' }}>
                <FaStar size={15} />
                <FaStar size={15} />
                <FaStar size={15} />
                <FaStar size={15} />
                <FaStar size={15} />
              </div>
          </div>
          <div className="py-4 px-5 mt-2 border border-gray rounded-lg">
          <p className="text-xl text-gray-dark">Todo excelente! Recomiendo.</p>
          </div>
        </div>

        {/* Review 4 */}
        <div className="relative">
          <div className="flex flex-row flex-nowrap items-center justify-between gap-x-4 px-4">
            <span className="text-xl text-gray-dark">19/07/2023</span>
            <div style={{ display: 'flex', gap: '4px', color: '#B061B2' }}>
                <FaStar size={15} />
                <FaStar size={15} />
                <FaStar size={15} />
                <FaStar size={15} />
                <FaStar size={15} />
              </div>
          </div>
          <div className="py-4 px-5 mt-2 border border-gray rounded-lg">
            <p className="text-xl text-gray-dark">Excelente atención y productos</p>
          </div>
        </div>

        {/* Review 5 */}
        <div className="relative">
          <div className="flex flex-row flex-nowrap items-center justify-between gap-x-4 px-4">
            <span className="text-xl text-gray-dark">19/07/2023</span>
            <div style={{ display: 'flex', gap: '4px', color: '#B061B2' }}>
                <FaStar size={15} />
                <FaStar size={15} />
                <FaStar size={15} />
                <FaStar size={15} />
                <FaStar size={15} />
              </div>
          </div>
          <div className="py-4 px-5 mt-2 border border-gray rounded-lg">
            <p className="text-xl text-gray-dark">Todo perfecto!! Voy a volver a comprar.</p>
          </div>
        </div>

        {/* Review 6 */}
        <div className="relative">
          <div className="flex flex-row flex-nowrap items-center justify-between gap-x-4 px-4">
            <span className="text-xl text-gray-dark">19/07/2023</span>
            <div style={{ display: 'flex', gap: '4px', color: '#B061B2' }}>
                <FaStar size={15} />
                <FaStar size={15} />
                <FaStar size={15} />
                <FaStar size={15} />
                <FaStar size={15} />
              </div>
          </div>
          <div className="py-4 px-5 mt-2 border border-gray rounded-lg">
            <p className="text-xl text-gray-dark">Recomendado al 100%!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;