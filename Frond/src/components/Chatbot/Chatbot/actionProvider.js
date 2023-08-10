
// const ActionProvider = (createChatBotMessage, setStateFunc) => {
//   const messages = [];

//   const handleAction = (action) => {
//     messages.push(createChatBotMessage(action.text, action.data));
//     setStateFunc({ messages });
//   };
//     const actions = Object.values(ActionProvider);
// }
//   return (
//     actions.map((action) => (
//       <button onClick={action}>
//         {action.text}
//       </button>
  
//     helloWorldHandler () => handleAction({ text: "¡Saludos! ¿Hay algo que pueda ayudarte?" }),
//     byeHandler () => handleAction({ text: "Veo que te vas. ¡Disfruta tu día!" }),
//     createChatBotMessage: (message) => {
//       messages.push(message);
//       setStateFunc({ messages });
//     },
//     discountsHandler: () => handleAction({ text: "¡Descuentos del mes 🔥", data: { widget: "productos" } }),
//     thanksHandler: () => handleAction({ text: "¡No hay problema! Si hay algo más que pueda hacer por ti, estoy a tu orden." }),
//     helpHandler: () => handleAction({ text: "Vendemos productos de la más excelente calidad. ¡Consulta nuestros productos en la sección de productos! Nuestro catálogo." }),
//     aboutHandler: () => handleAction({ text: "Vendemos productos a los mejores precios y más" }),
//     contactHandler: () => handleAction({ text: "Si quieres contactarnos envía un correo electrónico a @gmail.com" }),
//     diseaseHandler: () => handleAction({ text: "Tenemos algunos productos para diferentes enfermedades. Por favor, especifique la enfermedad, como Epilepsia, si tenemos algo para eso, se lo informaremos aquí. O simplemente escriba opciones para ver todas las enfermedades que cubrimos con nuestros productos." }),
//     diseasesList: () => handleAction({ text: "Tenemos productos de maquillaje, skinCare entre otros, puedes ver nuestras ofertas." }),
//     paymentHandler: () => handleAction({ text: `¡Aceptamos Visa y MasterCard como opciones de pago 💳!` }),
//   );
// ))

// export default ActionProvider;