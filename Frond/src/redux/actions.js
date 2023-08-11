import axios from "axios";
import { ALLBRANDS, ALLCATEGORIES, ALLCOLORS, ALLPRODUCTS, COPY_ALLPRODUCTS, ALLSIZES, ALLSUBCATEGORIES, CLEAN_DETAIL, PRODUCTS_DETAIL, PRODUCTS_FILTERED, POST_FAVORITES_API, POST_FAVORITES_API_INICIO, POST_FAVORITES_LS, DELETE_FAVORITES, DELETE_FAVORITES_API, PRODUCTOS, CART_PRODUCTS, ADD_TO_CART, GETPRODUCT_BYNAME  } from "./action-types";

// aca la ruta directamente porque la url base ya esta osea que solo queda por la ruta ejemplo:/producto

//action que trae la data
export const products = ({ page, size }) => async (dispatch) => {
    const { data } = await axios.get("/producto", {
      params: {
        page,
        size,
      },
    });
    dispatch({
      type: ALLPRODUCTS,
      payload: data,
    });

};
// esta accion es provisional, solo para llamar a 50 productos

export const productsCopy = () => async (dispatch) => {
  const { data } = await axios.get("/producto", {
    params: {
      page: 0,
      size: 50,
    },
  });
  dispatch({
    type: COPY_ALLPRODUCTS,
    payload: data,
  });

};

export const productosSinPag = () => async (dispatch) =>{
  const { data } = await axios.get("/producto");
  dispatch({
    type: PRODUCTOS,
    payload: data,
  });
}

export const categories = () => async dispatch => {
   const {data} =await axios.get("/categoria")
   dispatch({
      type: ALLCATEGORIES,
      payload: data
   })
  };
  export const subcategories = () => async dispatch => {
   const {data} =await axios.get("/subcategoria")
   dispatch({
      type: ALLSUBCATEGORIES,
      payload: data
   })
  };
  export const brands = () => async dispatch => {
   const {data} =await axios.get("/marca")
   dispatch({
      type: ALLBRANDS,
      payload: data
   })
  };
  export const colors = () => async dispatch => {
   const {data} =await axios.get("/color")
   dispatch({
      type: ALLCOLORS,
      payload: data
   })
  };
  export const sizes = () => async dispatch => {
   const {data} =await axios.get("/size")
   dispatch({
      type: ALLSIZES,
      payload: data
   })
  };
  export const getProductsByDetail = (id) =>{
   return async (dispatch) => {
     try {
       const { data } = await axios.get(`/producto/${id}`);
         return dispatch({
           type: PRODUCTS_DETAIL,
           payload: data,
         });
       } catch (error) {
       alert("Error: " + error.response.data.error);
     }
   }}
 
 
 export const cleanDetail = () => {
   return {
     type: CLEAN_DETAIL
   };
  }

  export const productFilter = (filtros) => {
    return{
      type : PRODUCTS_FILTERED,
      payload: filtros
  }
  }

  export const addFavoriteAPI = ({productoId, correo_electronico})=>{
    try {
      return async (dispatch) => {
        const requestData = {
          productoId: productoId,
          correo_electronico: correo_electronico,
        };
        await axios.post('/favorito', requestData);
        const {data} = await axios.get(`/favorito/${correo_electronico}`)
            return dispatch({
            type: POST_FAVORITES_API,
            payload: requestData,
            data: data
          });
        };
    } catch (error) {
      console.log(error);
    }
  }

  export const addFavoriteLS = (favorito)=>{
    return {
      type: POST_FAVORITES_LS,
      payload: favorito
    }
  }

  export const deleteFavoriteAPI = ({idFav, correo_electronico, id}) =>{
    try {
      return async (dispatch) => {
        await axios.delete(`/favorito/${idFav}`);
        const {data} = await axios.get(`/favorito/${correo_electronico}`)
        return dispatch({
          type: DELETE_FAVORITES_API,
          payload: id,
          data: data
        });
      };
    } catch (error) {
      console.log(error);
    }
  }
  
  export const deleteFavoriteLS = (idFav) =>{
    return {
      type: DELETE_FAVORITES,
      payload: idFav
    }
  }
  
  export const clearLocalFavorites = () => {
    return {
      type: POST_FAVORITES_LS,
      payload: [],
    };
  };
  
  export const syncFavoritesWithAPI = (correo_electronico) => {
    return async (dispatch, getState) => {
      const localFavorites = getState().localFavorites;
      const extractNumber = (string) => {
        const match = string.match(/\d+/); // Busca uno o más dígitos en la cadena
        return match ? parseInt(match[0]) : 0; // Convierte el resultado a un número o devuelve 0 si no hay coincidencia
      };
      const transformedFavorites = localFavorites.map(item => ({
        correo_electronico,
        productoId: extractNumber(item.id)
      }));
      
      localStorage.removeItem("localFavorites")
      dispatch(clearLocalFavorites());
      try {
        await axios.post(`/favorito`, transformedFavorites);
        const {data} = await axios.get(`/favorito/${correo_electronico}`)
        // Actualizar el estado con los datos de la API
        dispatch({
          type: POST_FAVORITES_API_INICIO,
          payload: data.map(item => item.productoId),
          data: data
        });
  
        // Limpiar los favoritos locales después de sincronizar con la API
      } catch (error) {
        console.log(error);
      }
    };
  };
 
  export const getCartProducts = (id) =>{
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`/producto/${id}`);
          return dispatch({
            type: CART_PRODUCTS,
            payload: data,
          });
        } catch (error) {
        alert("Error: " + error.response.data.error);
      }
    }}

  export const addToCartFunction = (id, amount) => {
    return {
      type: ADD_TO_CART,
      payload: {
        id,
        amount,
      },
    };
  };

  export const getProductByName = (name) =>{
    return async (dispatch)=>{
      try {
        const {data} = await axios.get(`/producto?name=${name}`);
        return dispatch({
          type: GETPRODUCT_BYNAME,
          payload: data
        })
      } catch (error) {
        alert("Error: " + error.response.data.error);
      }
    }
  }
  
