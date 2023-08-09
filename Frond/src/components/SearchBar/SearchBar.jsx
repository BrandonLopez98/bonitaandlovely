import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import loupe from '../../assets/img/Loupe.svg';
import styled from 'styled-components';
import { getProductByName } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

const FormSearchBar = styled.form`
background: var(--clr-white);
border: 2px solid var(--clr-primary); 
border-radius: 99em;
min-width: 500px;
max-width: 800px;
display: flex;
justify-content: space-between;
padding: 0 .7em;
border: 1px solid #eecafa;
box-shadow: inset 0 0 7px rgba(0,0,0,.15);


button {
	width: 20px;
	background: transparent;    
	border: none;
	margin-left: .5em;

	transition: transform .2s cubic-bezier(.25,.1,.75,2);
	
	transform-origin: center;
	text-align: right;
	&:hover, &:focus {
		filter: brightness(75%);
		transform: rotateZ(15deg);
	}

	img {
		height: 20px;
	}
}

input {
	background: transparent;
	border: 1px #0D0202;
	font-family: 'Roboto', sans-serif;
	font-weight:bold;
	font-size: 12px;
	color: #a53fc7;
	padding: .7em 1em;
	width: 100%;
}

button:focus, input:focus{
   outline: 2px solid var(--clr-primary);
}
`;

const Dropdown = styled.ul`
  position: absolute;
  z-index: 1;
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
  background-color: white;
  min-width: 450px;
  max-width: 700px;  
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  list-style-type: none;
  margin-left: 15px;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
`;

const DropdownItem = styled.li`
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f8f8f8;
  }
`;

const SearchBar = ({ placeholder }) => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (inputText) {
        const ProductFound = await dispatch(getProductByName(inputText));
        if (ProductFound) setSuggestions(ProductFound.payload);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [inputText, dispatch]);

  const handleChange = (ev) => {
    setInputText(ev.target.value);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (inputText) {
      const ProductFound = await dispatch(getProductByName(inputText));
      setSuggestions(ProductFound.payload);
      
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    navigate('/catalogo');
    setInputText(suggestion.name);
    setSuggestions([]);
  };

  const handleKeyPress = (ev) => {
    if (ev.key === 'Enter' || ev.key === 'Escape') {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <>
      <FormSearchBar onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          placeholder={placeholder}
          value={inputText}
        />
        <button type="submit">
          <img src={loupe} alt="seeker" />
        </button>
      </FormSearchBar>

      {suggestions.length > 0 && (
        <Dropdown>
          {suggestions.map((product) => (
            <DropdownItem
              key={product.id}
              onClick={() => handleSuggestionClick(product)}
            >
              {product.name}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </>
  );
};

export default SearchBar;






















































































// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import loupe from '../../assets/img/Loupe.svg';
// import styled from 'styled-components';
// import { getProductByName } from '../../redux/actions';
// import { useNavigate } from 'react-router-dom';

// const FormSearchBar = styled.form`
// background: var(--clr-white);
// border: 2px solid var(--clr-primary); 
// border-radius: 99em;
// min-width: 500px;
// max-width: 800px;
// display: flex;
// justify-content: space-between;
// padding: 0 .7em;
// border: 1px solid #eecafa;
// box-shadow: inset 0 0 7px rgba(0,0,0,.15);


// button {
// 	width: 20px;
// 	background: transparent;    
// 	border: none;
// 	margin-left: .5em;

// 	transition: transform .2s cubic-bezier(.25,.1,.75,2);
	
// 	transform-origin: center;
// 	text-align: right;
// 	&:hover, &:focus {
// 		filter: brightness(75%);
// 		transform: rotateZ(15deg);
// 	}

// 	img {
// 		height: 20px;
// 	}
// }

// input {
// 	background: transparent;
// 	border: 1px #0D0202;
// 	font-family: 'Roboto', sans-serif;
// 	font-weight:bold;
// 	font-size: 12px;
// 	color: #a53fc7;
// 	padding: .7em 1em;
// 	width: 100%;
// }

// button:focus, input:focus{
//    outline: 2px solid var(--clr-primary);
// }
// `;

// const Dropdown = styled.select`
//   background: var(--clr-white);
//   border: none;
//   font-family: 'Roboto', sans-serif;
//   font-weight: bold;
//   font-size: 12px;
//   color: #a53fc7;
//   padding: 0.7em 1em;
//   width: 100%;
//   cursor: pointer;
//   appearance: none;

//   &:focus {
//     outline: 2px solid var(--clr-primary);
//   }
// `;

// const SearchBar = ({ placeholder}) => {
//   const dispatch = useDispatch();
//   const [inputText, setInputText] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(async () => {
//       if (inputText) {
//         const ProductFound = await dispatch(getProductByName(inputText));
//         setSuggestions(ProductFound.payload);
//       } 
//     }, 300);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [inputText, dispatch]);

//   const handleChange = (ev) => {
//     setInputText(ev.target.value);
//   };

//   const handleSubmit = async (ev) => {
//     ev.preventDefault();
// 	if (inputText) {
// 		const ProductFound = await dispatch(getProductByName(inputText));
// 		setSuggestions(ProductFound.payload);
//   }else {
//     setSuggestions([]);
    
//   };
//   }

//   const handleSuggestionClick = (suggestion) => {
//     navigate('/catalogo');
//     setInputText(suggestion.name);
//     setSuggestions([]);    
//   };

//   return (
//     <>
//       <FormSearchBar onSubmit={handleSubmit}>
//         <input
//           onChange={handleChange}
//           type="text"
//           placeholder={placeholder}
//           value={inputText}
//         />
//         <button type="submit">
//           <img src={loupe} alt="seeker" />
//         </button>
//       </FormSearchBar>
//       {inputText && suggestions.length > 0 && (
//         <select>
//           {suggestions.map((product) => (
//             <li
//               class="text-[#a53fc7]"
//               key={product.id}
//               onClick={() => handleSuggestionClick(product)}
//               style={{ cursor: 'pointer' }}
//             >
//               {product.name}
//             </li>
//           ))}
//         </select>
//       )}     
//     </>
//   );
// };

// export default SearchBar;







  


















// import React, { useState } from 'react';
// import { useDispatch } from "react-redux";
// import loupe from '../../assets/img/Loupe.svg';
// import styled from 'styled-components';
// import { getProductByName } from "../../redux/actions";

// const FormSearchBar = styled.form`
// 	background: var(--clr-white);
// 	border: 2px solid var(--clr-primary); 
// 	border-radius: 99em;
// 	min-width: 500px;
// 	max-width: 800px;
// 	display: flex;
// 	justify-content: space-between;
// 	padding: 0 .7em;
// 	border: 1px solid #eecafa;
// 	box-shadow: inset 0 0 7px rgba(0,0,0,.15);


//     button {
// 		width: 20px;
// 		background: transparent;    
// 		border: none;
// 		margin-left: .5em;

// 		transition: transform .2s cubic-bezier(.25,.1,.75,2);
		
// 		transform-origin: center;
// 		text-align: right;
// 		&:hover, &:focus {
// 			filter: brightness(75%);
// 			transform: rotateZ(15deg);
// 		}

// 		img {
// 			height: 20px;
//     	}
//     }

//     input {
// 		background: transparent;
// 		border: 1px #0D0202;
// 		font-family: 'Roboto', sans-serif;
// 		font-weight:bold;
// 		font-size: 12px;
// 		color: #a53fc7;
// 		padding: .7em 1em;
// 		width: 100%;
// 	}
	
//     button:focus, input:focus{
//        outline: 2px solid var(--clr-primary);
//     }
// `

// const SearchBar = ({ placeholder, history }) => {
// 	const dispatch = useDispatch();
// 	const [inputText, setInputText] = useState('');
	
	
// 	const handleChange = (ev) => {
// 		setInputText(ev.target.value);
// 	};

// 	const handleSubmit = async(ev) => {
// 		ev.preventDefault();	
// 		console.log(inputText);	
// 		const ProductFound = await dispatch (getProductByName(inputText));
// 		console.log(ProductFound);
// 		if (ProductFound.payload.length>0){
// 			setInputText('');
// 		}else{
// 			alert ("Producto no encontrado");
// 			setInputText("");
// 		}
// 	};

// 	return (
// 		<FormSearchBar onSubmit={handleSubmit}>
// 			<input onChange={handleChange} type="text" placeholder={placeholder} value={inputText} />
			// <button type="submit">
			// 	<img src={loupe} alt="seeker"/>
			// </button>
// 		</FormSearchBar>
// 	);
// };

// export default SearchBar;
 









