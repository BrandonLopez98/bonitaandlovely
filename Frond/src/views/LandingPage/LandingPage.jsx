import { useState } from 'react';
import styled from 'styled-components';
import { RiMoonClearLine, RiSunLine } from 'react-icons/ri';
import NavBar from "../../components/NavBar/NavBar";
import Proveedores from '../../components/Proveedores/Proveedores';
import Carousel from '../../components/Carousel/Carousel';
import CarouselMid from '../../components/CarouselMid/Carousel'
import Products from '../../components/Products/Products'
// import Offers from '../../components/offers/offers'
import Footer from '../../components/Footer/Footer';
import ChatBotComponent from '../../components/ChatBot/ChatBot';
import Reviews from '../../components/Reviews/Reviews'
import ChooseUs from '../../components/ChooseUsSection/Choose';


const Container = styled.div`
  background-color: ${props => props.darkMode ? '#1a1a1a' : '#ebeaea'};
  color: ${props => props.darkMode ? '#fff' : '#333'};
  padding: 0rem;

`;




const LandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en'); 

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getButtonLabel = (buttonLanguage) => {
    if (language === 'es') {
      return buttonLanguage === 'es' ? 'Español' : 'Inglés';
    } else if (language === 'en') {
      return buttonLanguage === 'es' ? 'Spanish' : 'English';
    }
  };


  return (
    <>
        <NavBar />
      <Container darkMode={isDarkMode}>
        <div style={{ height: '800px', overflowX: 'scroll', marginTop: '-2%' }}>
          <CarouselMid />
        </div>
        
        <Proveedores/>
        <Products/>
      

        <div style={{ height: '500px', overflowX: 'scroll' }}>
        <CarouselMid></CarouselMid>
        </div>

        <>
        <Reviews></Reviews>
        </>
        <>
        <ChooseUs></ChooseUs>
        </>

      </Container>
      <ChatBotComponent language={language} />
      <Footer />
    </>
  );
};

export default LandingPage;