import React from 'react';
import Marca from '../../assets/img/marca.png'
import style from './Proveedores.module.css'
import styled from 'styled-components'
const Card = styled.div`
  background-color: #fff;
  border-radius: 2rem;
  display:flex;
  padding:1rem;
  flex-direction:row;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  margin: 1rem;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);

  }
`;
const Proveedores = () => {


return (
    <div className={style.Proveedores}>
        <h1 className={style.titulo}>Marcas asociadas</h1>

        <div className={style.flex}>
        <Card>
        <img src={Marca} alt="" />
        </Card>

        <Card>
        <img src={Marca} alt="" />
        </Card>

        <Card>
        <img src={Marca} alt="" />
        </Card>

       
        </div>

    </div>
    )
}
export default Proveedores;