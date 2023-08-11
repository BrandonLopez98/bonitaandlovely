import React from "react";
import styled from 'styled-components';
import { useAuth0 } from "@auth0/auth0-react";
import { FaUser } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { IoBagHandleSharp } from 'react-icons/io5';
import { IoSettingsSharp } from 'react-icons/io5';
import style from './Profile.module.css';
import LogoutButton from '../Logout';
import { useState } from 'react';
import off from '../../../assets/img/off.png';
import { useNavigate } from 'react-router-dom';

const Online = styled.div`
  background-color: greenyellow;
  border-radius: 50%;
  padding: .rem .6rem;
  width: 15px;
  height:15px;
  position: absolute;
  left:85.5%;
  bottom: 38%;
  z-index: 100;
`;

const OnlineDrop = styled.div`
  background-color: greenyellow;
  border-radius: 50%;
  padding: .rem .6rem;
  width: 20px;
  height:20px;
`;

const Profile = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth0();

  const toggleUserMenu = () => {
    setIsOpen(!isOpen);
  };

  const goCart = () => {
    navigate('/carrito/:id');
  };
  const goPerfil = () => {
    navigate('/perfil');
  };
  const goCompras = () => {
    navigate('/misCompras');
  };

  if (!isAuthenticated) {
    return <div className={style.unloguedUser}><FaUser/></div>;
  }

  return (
    isAuthenticated && (
      <div className="relative flex items-center">
        <img onClick={toggleUserMenu} className={style.imgProfile} src={user.picture} alt={user.name} />
        {user.online && <Online className="absolute" />}
        {isOpen && (
          <div className="absolute left-6 top-8 right-0 z-20 w-48 bg-white border rounded-md shadow-lg pt-3 mt-7 mr-2">
            <div className="flex items-center">
              <img className={style.drop} src={user.picture} alt={user.name} />
              {user.online && <OnlineDrop className="ml-2 z-40" />}
            </div>
            <div onClick={goPerfil} className="mt-5 cursor-pointer block px-4 py-2 text-gray-800 hover:bg-gray-200 border-b-2 border-solid">
              <IoSettingsSharp className="inline-block mr-2" />
              Mi perfil
            </div>
            <div onClick={goCompras} className="cursor-pointer block px-4 py-2 text-gray-800 hover:bg-gray-200 border-b-2 border-solid">
              <IoBagHandleSharp className="inline-block mr-2" />
              Mis compras
            </div>
            <div  onClick={goCart} className="cursor-pointer block px-4 py-2 text-gray-800 hover:bg-gray-200 border-b-2 border-solid">
              <FaShoppingCart className="inline-block mr-2" />
              Mi carrito
            </div>
            <div className='flex'>
              <img className={style.off} src={off} alt="off" />
              <LogoutButton />
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default Profile;