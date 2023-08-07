import React, { useState } from 'react';
import avatar1 from '../../assets/img/avatar1.png';
import avatar2 from '../../assets/img/avatar2.png';
import avatar3 from '../../assets/img/avatar3.png';



const faqsData = [
  {
    pregunta: 'Como ponerme en contacto directamente con un proveedor?',
    respuesta:'Para hacer lo siguiente, debes buscar en la seccion de informacion del proveedor, y buscar sus datos de contacto para poder establacer comunicacion con el mismo',
  },
  {
    pregunta: 'Puedo cambiar mi plan luego?',
    respuesta:'Respuesta a la pregunta 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    pregunta:  'Que sucede con mi producto justo despues de realizar la compra?',
    respuesta: 'loremipsum'
  },
  {
    pregunta:'Can other info be added to an invoice?',
    respuesta:'loremipsum'
  },{
    pregunta:'Cuanto tarda el envio en capital?',
    respuesta:'loremipsum'
  },
  {
    pregunta:'Como cambio mi correo electronico?',
    respuesta:'loremipsum'
  }
  
];

const FAQs = () => {
  const [showFullAnswer, setShowFullAnswer] = useState(-1);

  const toggleAnswer = (index) => {
    setShowFullAnswer((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <><div className="py-8">
      {/* Primer container */}
      <div className="container mx-auto max-w-[1280px] px-32 flex items-center gap-10 justify-center">
        <div className="w-[1280px] h-[94px] px-8 flex-col justify-start items-start gap-8 inline-flex">
          <div className="self-stretch h-[94px] flex-col justify-start items-center gap-12 flex">
            <div className="h-[94px] flex-col justify-start items-center gap-5 flex">
              <div className="self-stretch text-center text-gray-900 text-4xl font-semibold leading-[44px]">Preguntas frecuentes?</div>
              <div className="self-stretch text-center text-gray-500 text-xl font-normal leading-[30px]">Resuelve cualquier dudad que tengas sobre nosotros en esta seccion de FAQ’S</div>
            </div>
          </div>
        </div>
      </div>

      {/* Segundo container */}
      <div className="container mx-auto mt-20" style={{ maxWidth: "1000px" }}>
        {faqsData.map((faq, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="cursor-pointer" onClick={() => toggleAnswer(index)}>
              <h2 className="text-xl font-semibold text-purple-800" style={{ marginLeft: '3rem' }}>
                {faq.pregunta}
              </h2>
            </div>
            <p
              className={`mt-2 text-gray-600 ${showFullAnswer === index ? 'block' : 'hidden'}`} style={{ marginLeft: '3rem' }}
            >
              {faq.respuesta}
            </p>
            <button
              className={`mt-2 text-purple-800 font-semibold ${showFullAnswer !== index ? 'block' : 'hidden'}`}
              onClick={() => toggleAnswer(index)} style={{ marginLeft: '3rem' }}
            >
              {showFullAnswer === index ? 'Mostrar menos' : 'Mostrar más'}
            </button>
          </div>
        ))}
      </div>

      {/* Tercer container */}
      <div className="container mx-auto mt-20 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


          <div className="w-[120px] h-14 relative flex justify-center mx-auto ">
            <img className="w-12 h-12 left-0 top-[8px] absolute rounded-[200px] border border-white" src={avatar1} />
            <img className="w-12 h-12 left-[72px] top-[8px] absolute rounded-[200px] border border-white" src={avatar2} />
            <img className="w-14 h-14 left-[32px] top-0 absolute rounded-[200px] border border-white" src={avatar3} />
          </div>


        </div>
        <p className="text-lg text-gray-600 mt-6">¿Aún tienes dudas sin resolver?</p>
        <p className="text-gray-600">Si aún tienes dudas sin resolver, ¡contáctanos!</p>
        <button className="bg-purple-800 text-white rounded-lg px-4 py-2 mt-4">
          Contactar equipo
        </button>
      </div>

    </div></>
  );
};

export default FAQs;


