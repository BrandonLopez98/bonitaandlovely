import React from "react";
import './App.css';
import {Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import Products from "./components/Products/Products";
import AboutUs from "./views/AboutUs/AboutUs";
import Contact from "./views/Contact/Contact";
import DevTeam from './views/DevTeam/devTeam.jsx'
import FAQs from "./views/FAQs/FAQs"
import Catalogo from "./views/Catalogo/Catalogo.jsx";
import Chatbot from "react-chatbot-kit";
import Form from "./views/Form/Form";
import Profile from "./views/Profile/Profile";
import Configs from "./components/ChatBot/Configs";
import MessageParser from "./components/ChatBot/MessageParser";
import Detail from "../src/views/Detail/Detail";
import Dashboard from "./components/Dashboard/Dashboard";
import axios from "axios"
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import AddToCart from "./views/Cart/AddToCart";
import Carrito from "./views/Cart/Carrito";
//para no repetir el puerto:(se está configurando una URL base que se utilizará como prefijo para todas las peticiones realizadas con Axios) 
axios.defaults.baseURL = "http://localhost:3001/"

// import ActionProvider from "./components/ChatBot/ActionProvider";


function App () {
  const location = useLocation()

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
        <Route path="/itemadded/:id" element={<AddToCart />} />
        <Route path="/carrito/:id" element={<Carrito />} />
        <Route path="/dashboard" element = {<Dashboard/>}/>

      </Routes>
      <div className="chatbot-container">
        <Chatbot
          config={Configs}
          messageParser={MessageParser}
          // actionProvider={ActionProvider}
        />
      </div>
      {
            location.pathname !== "/" ? <Footer /> : null
         }
    </div>
  );
}

export default App;