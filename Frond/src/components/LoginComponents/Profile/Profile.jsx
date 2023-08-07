import React from "react";
import styled from 'styled-components'
import { useAuth0 } from "@auth0/auth0-react";
import { FaUser } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { IoBagHandleSharp } from 'react-icons/io5';
import { IoSettingsSharp } from 'react-icons/io5';
import style from './Profile.module.css'
import LogoutButton from '../Logout'
import { useState } from 'react'
import off from '../../../assets/img/off.png'

const Online = styled.div`
  background-color: greenyellow;
  border-radius: 50%;
  padding: .rem .6rem;
  width: 15px;
  height:15px;
  position: absolute;
  left:85.5%;
  bottom: 38%;
`

const OnlineDrop = styled.div`
  background-color: greenyellow;
  border-radius: 50%;
  padding: .rem .6rem;
  width: 20px;
  height:20px;
  position: absolute;
  left:60%;
  bottom: 55%;
`

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth0();

  const showUserMenu = () => {
    setIsOpen(true);
  };
  const hideUserMenu = () => {
    setIsOpen(false);
  };
  


  if (!isAuthenticated) {
    return <div className={style.unloguedUser}><FaUser/></div>
  }

  


  return (
    isAuthenticated && (
    <div >
      <img onMouseEnter={showUserMenu} onMouseLeave={hideUserMenu} className={style.imgProfile} src={user.picture} alt={user.name} />
      <Online>.</Online>
      {isOpen && (
    <div onMouseEnter={showUserMenu} onMouseLeave={hideUserMenu} className="absolute top-12 right-0 z-20 w-48 bg-white border rounded-md shadow-lg pt-3 mt-7 mr-2">
      <img className={style.drop} src={user.picture} alt={user.name} />
      <OnlineDrop>.</OnlineDrop>

    <a href="#perfil" className="block px-4 py-2 text-gray-800 hover:bg-gray-200 border-b-2 border-solid">
    <IoSettingsSharp className="inline-block mr-2" />
      Mi perfil
    </a>
    <a href="#compras" className="block px-4 py-2 text-gray-800 hover:bg-gray-200 border-b-2 border-solid">
    <IoBagHandleSharp className="inline-block mr-2" />
      Mis compras
    </a>
    <a href="#carrito" className="block px-4 py-2 text-gray-800 hover:bg-gray-200 border-b-2 border-solid">
    <FaShoppingCart className="inline-block mr-2" />
    Mi carrito
    </a>
    
    <div className='flex'>
      <img className={style.off} src={off} alt="off" />
      <LogoutButton/>
    </div>
        </div>
)}
      </div>
      
    )
  );
};

export default Profile;