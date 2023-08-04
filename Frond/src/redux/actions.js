import axios from "axios";
import { ALLPRODUCTS } from "./action-types";

// aca la ruta directamente porque la url base ya esta osea que solo queda por la ruta ejemplo:/producto

//action que trae la data
export const products = () => async dispatch => {
 const {data} =await axios.get("/producto")
 dispatch({
    type: ALLPRODUCTS,
    payload: data
 })
};