import axios from "axios";
import { ALLBRANDS, ALLCATEGORIES, ALLCOLORS, ALLPRODUCTS, ALLSIZES, ALLSUBCATEGORIES, CLEAN_DETAIL, GET_PRODUCTS_BY_NAME, PRODUCTS_DETAIL } from "./action-types";

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
  export const getproductsByDetail = (id) =>{
   return async (dispatch) => {
     try {
       const { data } = await axios.get(`???`);
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
 };

 export const getProductByName = () => async dispatch => {
  const {data} =await axios.get("/name")
  dispatch({
     type: GET_PRODUCTS_BY_NAME,
     payload: data
  })
 };