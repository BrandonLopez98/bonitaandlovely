import styled from 'styled-components'
import ofertas from '../../assets/img/Ofertas img.jpeg'


import { useNavigate } from 'react-router-dom';

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom:5%;
  margin-top:3%;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 1rem;
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
const H1 = styled.h1`
font-weight:600;
margin-left:1%;
font-size:30px;
`
const Img = styled.img`
width: 520px`

const Products = () => {
  const navigate = useNavigate()
  const filterByCategories = (event) => {
    const categoryToFilter = event.target.name
    switch (categoryToFilter) {
     case 'Maquillaje':
       navigate('/catalogo')
       break;
 
     case 'Skincare':
       navigate('/catalogo')
       break;
 
     case 'Accesorios':
       navigate('/catalogo')
       break;
       
    
     default:
       break;
    }
   }

return (
  <><H1>Descubre nuestras categorias</H1><CardContainer>
   
    <Card>
    <Img src={ofertas} alt="img" />
    <button name='Maquillaje' onClick={filterByCategories} class="absolute h-10 px-10 font-semibold rounded-md bg-black mt-20 ml-10 text-white" type="submit">
            Ver mas
          </button>

    </Card>

    <Card>
    <Img src={ofertas} alt="img" />
    <button name='Skincare' onClick={filterByCategories} class="absolute h-10 px-10 font-semibold rounded-md bg-black mt-20 ml-10 text-white" type="submit">
            Ver mas
          </button>
  
    </Card>

    <Card>
    <Img src={ofertas} alt="img" />
    <button name='Accesorios' onClick={filterByCategories} class="absolute h-10 px-10 font-semibold rounded-md bg-black mt-20 ml-10 text-white" type="submit">
            Ver mas
          </button>
    </Card>

    
  </CardContainer></>
    )
}
export default Products;