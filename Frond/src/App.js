import React, { useState } from "react";
import ReactDOM from 'react-dom';
import './App.css';
import {Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import Products from "./components/Products/Products";
import AboutUs from "./views/AboutUs/AboutUs";
import Contact from "./views/Contact/Contact";
import DevTeam from './views/DevTeam/devTeam.jsx'
import FAQs from "./views/FAQs/FAQs"
import Catalogo from "./views/Catalogo/Catalogo.jsx";
import ChatbotProvider from "react-chatbot-kit";
import Form from "./views/Form/Form";
import Profile from "./views/Profile/Profile";
import Config from "./components/Chatbot/Chatbot/config.jsx";
import MessageParser from "./components/Chatbot/Chatbot/MessageParser";
import Detail from "../src/views/Detail/Detail";
import ActionProvider from "./components/Chatbot/Chatbot/actionProvider";

import Dashboard from "./components/Dashboard/Dashboard";
import axios from "axios"
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
//para no repetir el puerto:(se está configurando una URL base que se utilizará como prefijo para todas las peticiones realizadas con Axios) 
axios.defaults.baseURL = "http://localhost:3001/"




function App () {
  const location = useLocation();
  
  const messageParser = (message) => {
    return JSON.parse(message);
  };
  
  const actionProvider = (action) => {
    console.log(action);
  };
  
  const Chatbot = ({ config, messageParser, actionProvider }) => {
    return (
        <ul>
          {Object.entries(config).map(([key, value]) => (
            <li key={key}>{key}: {value}</li>
          ))}
        </ul>
    );
  };

  
  return (
    <div>
      {
            location.pathname !== "/" ? <Navbar /> : null
         }
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/devTeam" element={<DevTeam />} />
        <Route path="/form" element={<Form />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/catalogo/detail/:id" element={<Detail />} />

        <Route path="/dashboard" element = {<Dashboard/>}/>
        
      </Routes>
      <div className="chatbot-container">
      <ChatbotProvider>
        <chatbot 
          config={Config}
          floating='true' headerTitle='BellaBot' placeholder='Escribe tu pregunta'
          messageParser={MessageParser}
          actionProvider={ActionProvider} />
      </ChatbotProvider>
      </div>
      {
            location.pathname !== "/" ? <Footer /> : null
         }
    </div>
  );
}

export default App;