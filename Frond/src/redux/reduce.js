import { ALLPRODUCTS } from "./action-types";


const InitialState = {
    Allproducts: [],
}

const reducer = (state = InitialState, {type, payload}) => {
    switch (type) {
        case ALLPRODUCTS :
            return{
                ...state,
                Allproducts: payload
            }
        default:
            return state
    }
}

export default reducer;