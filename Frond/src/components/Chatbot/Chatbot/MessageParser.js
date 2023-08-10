// const MessageParser = (actionProvider, state) => {
//     const saludos = ['saludame','hola','holi', 'holu','buen día','buenas tardes', 'buenas noches','hello']
//     const bye = ['bye','see ya', 'see you', 'hasta pronto']
//     const thanks = ['thank','great','gracias']
//     const products = ['categoria', 'marca', 'precio']
//     const payment = ['cash', 'credit card', 'payment']
  
//     const optionsList = ['categoria', 'marca', 'precio']
  
//     let lowercase = message.toLowerCase();
//     const message = '';
  
//     function parse(message) {
//       for (let i = 0; i < saludos.length; i++) {
//         if(lowercase.includes(saludos[i]))
//           actionProvider.helloWorldHandler()
//       }
  
//       for (let i = 0; i < thanks.length; i++) {
//         if(lowercase.includes(thanks[i]))
//           actionProvider.thanksHandler()
//       }
  
//       for (let i = 0; i < bye.length; i++) {
//         if(lowercase.includes(bye[i]))
//           actionProvider.byeHandler()
//       }
  
//       for (let i = 0; i < products.length; i++) {
//         if(lowercase.includes(products[i]))
//           actionProvider.productHandler()
//       }
      
//       for (let i = 0; i < payment.length; i++) {
//         if(lowercase.includes(payment[i]))
//           actionProvider.paymentHandler()
//       }
  
//       if(lowercase.includes('disc'))
//           actionProvider.discountsHandler()
  
//       if(lowercase.includes('help'))
//           actionProvider.helpHandler()
  
//       if(lowercase.includes('about'))
//           actionProvider.aboutHandler()
  
//       if(lowercase.includes('contact'))
//           actionProvider.contactHandler()
  
//       if(lowercase.includes('catalogo'))
//           actionProvider.catalogoHandler()
      
//       if(lowercase.includes('options'))
//           actionProvider.optionsList()
          
//           for (let i = 0; i < optionsList.length; i++) {
//               if(lowercase.includes(optionsList[i])){
//                   console.log(optionsList[i])
//                   switch (optionsList[i]) {
//                       case "categoria":
//                           actionProvider.categoria()
//                           break;
//                       case "marca":
//                           actionProvider.marca()
//                           break
//                       case "precio":
//                           actionProvider.precio()
//                           break
                          
//                       default:
//                           break;
//                   }
//               }
//           }
//     }
  
//     return {
//       parse,
//     };
//   };
  
//   export default MessageParser;