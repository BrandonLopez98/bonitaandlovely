import { ALLCATEGORIES, ALLPRODUCTS, ALLBRANDS, ALLCOLORS, ALLSIZES, ALLSUBCATEGORIES, PRODUCTS_DETAIL, CLEAN_DETAIL } from "./action-types";

const InitialState = {
    Allproducts: [],
    Allcategories: [],
    Allsubcategories: [],
    Allbrands: [],
    Allsizes: [],
    Allcolors: [],
    productsDetail: [],
}

const reducer = (state = InitialState, {type, payload}) => {
    switch (type) {
        case ALLPRODUCTS :
            return{
                ...state,
                Allproducts: payload
            }
        case ALLCATEGORIES :
            return{
                ...state,
                Allcategories: payload
            }
        case ALLSUBCATEGORIES :
            return{
                ...state,
                Allsubcategories: payload
            }
        case ALLBRANDS :
            return{
                 ...state,
                Allbrands: payload
            }
        case ALLCOLORS :
            return{
                ...state,
                Allcolors: payload
            }
        case ALLSIZES :
            return{
                ...state,
                Allsizes: payload
            }
        case PRODUCTS_DETAIL:
            return {
                ...state,
                productsDetail: payload
            };
    
        case CLEAN_DETAIL:
            return {
                ...state,
               productsDetail: []
            }
        
            
        default:
        return state
    }
}

export default reducer;