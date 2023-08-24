import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../assets/img/logoBonitaLovelyw.png';
import vector from '../../assets/img/vector.svg'
import { FiChevronDown } from "react-icons/fi";
import { AiFillHeart } from 'react-icons/ai';
import {AiFillShopping} from 'react-icons/ai'
import SearchBar from '../SearchBar/SearchBar';
import style from './NavBar.module.css';
import LoginButton from '../LoginComponents/Login';
import Profile from '../LoginComponents/Profile/Profile';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux'
import { categories, productFilter } from '../../redux/actions';
import Swal from 'sweetalert2';

const Navbar = ({ initialLanguage }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSub, setIsOpenSub] = useState(false)
  const dispatch = useDispatch()
  const categorias = useSelector((state) => state.Allcategories)
  console.log(categorias)
  const [showMenu, setShowMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [language, setLanguage] = useState(initialLanguage || 'en');

  const toggleLanguageMenu = () => {
    setShowLanguageMenu(!showLanguageMenu);
  };

  const changeLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setShowLanguageMenu(false);
  };

  const showCategories = () => {
    setIsOpen(true);
  };
  const hideCategories = () => {
    setIsOpen(false);
  };
  const showSub = () => {
    setIsOpenSub(true);
  };
  const hideSub = () => {
    setIsOpenSub(false);
  };
  const navigate = useNavigate()
  const {loginWithRedirect} = useAuth0()

  // const filterByCategories = (event) => {
  //  const categoryToFilter = event.target.textContent
  //  const categoriaId = event.target.id
  //  console.log(categoriaId)
  //  console.log(categoryToFilter)
  //  switch (categoryToFilter) {
  //   case 'Maquillaje':
  //     navigate('/catalogo')
  //     dispatch(productFilter({categoriaId: [1]}))
  //      break;
 
  //    case 'Skincare':
  //      navigate('/catalogo')
  //      dispatch(productFilter({categoriaId: [2]}))
  //      break;
 
  //    case 'Accesorios':
  //      navigate('/catalogo')
  //      dispatch(productFilter({categoriaId: [3]}))
  //      break;
       
   
  //   default:
  //     break;
  //  }
  // }


  //Condicionales de logueo

const navigateFavoritos = () => {
  navigate('/favoritos')
}
const navigateCarrito = () => {
  navigate('/carrito/:id')
}

  

  return (
    <>
      <nav className={style.nav}>
        <div className="flex items-center">
          <Link to="/">
            <img src={Logo} alt="Logo" className={style.logo} />
          </Link>

          <div className={style.searchBar}>
            <SearchBar />
          </div>

          <div className={style.icons}>
            <button onClick={navigateCarrito} className={style.btnb}>
              <AiFillShopping />
            </button>
            <button  onClick={navigateFavoritos} className={style.btnb}>
              <AiFillHeart />
            </button>
            <div className={style.menuItem}>
              <Profile />
              <LoginButton />
              {isAuthenticated && <p className={style.userName}>{user.name}</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center ml-10">
         
          <div className={`${style.categoriesMenu}`}>
            <ul className={`${style.menu} ${showMenu ? style.show : ''}`}>
              <li>
                <NavLink
                  to="/"
                  lang={initialLanguage === 'en' ? 'en' : 'es'}
                  className={`${style.menuItem} ${style.itemHome}`}
                >
                  {initialLanguage === 'en' ? 'Home' : 'Inicio'}
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/AboutUs"
                  lang={initialLanguage === 'en' ? 'en' : 'es'}
                  className={`${style.menuItem} ${style.itemAbout}`}
                >
                  {initialLanguage === 'en' ? 'About Us' : 'Nosotros'}
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  lang={initialLanguage === 'en' ? 'en' : 'es'}
                  className={style.menuItem}
                >
                  {initialLanguage === 'en' ? 'Contact Us' : 'Contacto'}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/catalogo"
                  lang={initialLanguage === 'en' ? 'en' : 'es'}
                  className={style.menuItem}
                >
                  {initialLanguage === 'en' ? 'Catalogo' : 'Catalogo'}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/faqs"
                  lang={initialLanguage === 'en' ? 'en' : 'es'}
                  className={style.menuItem}
                >
                  {initialLanguage === 'en' ? 'FAQs' : 'FAQs'}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/devTeam"
                  lang={initialLanguage === 'en' ? 'en' : 'es'}
                  className={style.menuItem}
                >
                  {initialLanguage === 'en' ? 'devTeam' : 'DevTeam'}
                </NavLink>
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </>
  );
};

export default Navbar;