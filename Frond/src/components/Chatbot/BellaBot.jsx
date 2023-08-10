// import React from "react";
// import Chatbot from "react-chatbot-kit";
// import config from "./Chatbot/config";
// import MessageParser from "./Chatbot/MessageParser";
// import ActionProvider from "./Chatbot/actionProvider";


// function BellaBot () {
//   const [messages, setMessages] = React.useState([]);

//   const handleMessage = (message) => {
//     const parsedMessage = MessageParser.parse(message);
//     console.log(parsedMessage);

//     // Comprobar si el mensaje infringe alguna directriz de seguridad
//     if (parsedMessage.violations) {
//       // Si lo hace, no responda
//       return;
//     }

//     // De lo contrario, responde normalmente
//     ActionProvider.helloWorldHandler();
//     setMessages([...messages, parsedMessage]);
//   };

//   return (
//     <div className="fixed bottom-30 right-30 bg-green-500 p-10 rounded-2xl text-white border-none flex justify-center items-center">
//       <div className="fixed bottom-76 right-30 z-9999">
//         <div className="react-chatbot-kit-chat-container">
//           <input
//             className="react-chatbot-kit-chat-input rounded-tl-2xl border border-black"
//             placeholder="Write a message..."
//             onChange={(e) => handleMessage(e.target.value)}
//           />
//           <Chatbot
//             config={config}
//             messageParser={MessageParser}
//             actionProvider={ActionProvider}
//             messages={messages}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BellaBot;