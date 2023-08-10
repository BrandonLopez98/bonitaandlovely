import React from 'react';
import './Footer.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
// import { faCreditCard, faMoneyCheck } from '@fontawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logoBonitaLovelyw.png';
import Facebook from '../../assets/img/facebook.png';
import Twitter from '../../assets/img/gorjeo.png';
import Gmail from '../../assets/img/gmail.png';
import style from './Footer.module.css'

function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footerColumn}>
        <div className={style.footerLogo}>
          <img src={Logo} alt="Company logo" />
        </div>
        <div className={style.footerSocial}>
          <a href="https://www.facebook.com/" rel="noopener noreferrer"><img src={Facebook} alt="Facebook" width="30" height="30" /></a>
          <a href="https://www.twitter.com/" rel="noopener noreferrer"><img src={Twitter} alt="Twitter" width="30" height="30" /></a>
          <a href="mailto:contacto@tutienda.com"><img src={Gmail} alt="Email" width="30" height="30" /></a>
        </div>
      </div>
      <div className={style.footerColumn}>
        <h4>Catalogo</h4>
        <ul className={style.footerList}>
          <li><Link to="/products">Productos</Link></li>
          <li><Link to="/subcategories">Categorias</Link></li>
          <li><Link to="/all">All</Link></li>
        </ul>
      </div>
      <div className={style.footerColumn}>
        <h4>Informacion</h4>
        <ul className={style.footerList}>
          <li><Link to="/about-us">Sobre nosotros</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
        </ul>
      </div>
      
      <div className={style.footerColumn}>
        <h4>Servicio al cliente</h4>
        <ul className={style.footerList}>
          <li><Link to="/customer-service">Contacto</Link></li>
        </ul>
       
      </div>
      <div className={style.footerBottom}>
        {/* <a href="#top"><FontAwesomeIcon icon={faArrowUp} /></a> */}
        <div className={style.footerPaymentIcons}>
          {/* <FontAwesomeIcon icon={faCreditCard} />
          <FontAwesomeIcon icon={faMoneyCheck} /> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;