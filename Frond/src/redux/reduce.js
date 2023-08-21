import { ALLBRANDS, ALLCATEGORIES, ALLCOLORS, ALLPRODUCTS, COPY_ALLPRODUCTS, ALLSIZES, ALLSUBCATEGORIES, CLEAN_DETAIL, PRODUCTS_DETAIL, PRODUCTS_FILTERED, POST_FAVORITES_API, POST_FAVORITES_API_INICIO, POST_FAVORITES_LS, DELETE_FAVORITES, DELETE_FAVORITES_API, PRODUCTOS, CART_PRODUCTS, ADD_TO_CART, GETPRODUCT_BYNAME, POST_CART_LS, DELETE_CART_LS, EMPTY_LOCAL_CART, DELETE_ART_LS,POST_CART_API, DEL_ART_API, GET_ALL_CLIENTS, GET_ALL_VENTAS, GET_USER_COMPRAS, POST_ART_API } from "./action-types";
import { userCompras } from "./actions";
const storedLocalFavorites = localStorage.getItem("localFavorites");
const initialLocalFavorites = storedLocalFavorites ? JSON.parse(storedLocalFavorites) : [];
const storedLocalCart = localStorage.getItem("localCart");
const initialLocalCart = storedLocalCart ? JSON.parse(storedLocalCart) : [];

const InitialState = {
    Allproducts: [],
    copyAllProducts: [],
    Allcategories: [],
    Allsubcategories: [],
    Allbrands: [],
    Allsizes: [],
    Allcolors: [],
    productsDetail: [],
    productsFiltered: [],
    productos: [],
    favorites: [],
    localFavorites: initialLocalFavorites,
    favoritesRaw: [],
    cartProducts: [],
    searchResults: [],
    addProductsToCart: [],
    localCart: initialLocalCart, apiCart:[],
    Allclients: [],
    Allventas: [],
    userCompras: []
}

const reducer = (state = InitialState, {type, payload, data}) => {
    switch (type) {
        case ALLPRODUCTS :
            return{
                ...state,
                Allproducts: payload
            }
        case PRODUCTOS:
            return{
                ...state,
                productos: payload
            }
        //case provisional
        case COPY_ALLPRODUCTS:
            return{
                ...state,
                copyAllProducts: payload
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
            case GET_ALL_CLIENTS :
                return{
                    ...state,
                    Allclients: payload
                }
                case GET_ALL_VENTAS :
                    return{
                        ...state,
                        Allventas: payload
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
        case POST_FAVORITES_API:
            const productosFav = (id) =>{
                return state.productos.find((product)=>product.id===id)
            }
            const {productoId} = payload
            const newFavorites = [...state.favorites, productosFav(`prod-${productoId}`)]
            return {
                ...state,
                favorites: newFavorites,
                favoritesRaw: data
            }
        
        case POST_FAVORITES_API_INICIO:
            const productsFavI = (ids) => {
                return state.productos.filter((prod) => ids.includes(prod.id));
              };

              const favoritesInicio = productsFavI(payload);
            return {
                ...state,
                favorites: favoritesInicio, 
                favoritesRaw: data
            }

        case POST_FAVORITES_LS:
            const productsFav = (id) => {
                return state.productos.find((prod) => prod.id === id);
            };

            if (payload.length > 0) {
                const newLocalFavorites = [...state.localFavorites, productsFav(payload)];
                // Actualiza el Local Storage con la nueva lista de favoritos
                localStorage.setItem("localFavorites", JSON.stringify(newLocalFavorites));
    
                return {
                    ...state,
                    localFavorites: newLocalFavorites,
                };
            } else {
                return {
                    ...state,
                    localFavorites: payload
                }
            }

        case DELETE_FAVORITES:
            const newLocalFavoritesAfterDelete = state.localFavorites.filter((item) => item.id !== payload);
            // Actualiza el Local Storage con la nueva lista de favoritos después de eliminar
            localStorage.setItem("localFavorites", JSON.stringify(newLocalFavoritesAfterDelete));
      
            return {
              ...state,
              localFavorites: newLocalFavoritesAfterDelete,
            };
        case DELETE_FAVORITES_API:
            const newFavoritesAfterDelete = state.favorites.filter((item) => item.id !== payload);
            return {
                ...state,
                favorites: newFavoritesAfterDelete,
                favoritesRaw: data
            };
                
        case PRODUCTS_FILTERED:
            const filtrarProductos = (productos, filtro) => {
                if (
                    filtro.categoriaId.length === 0 &&
                    filtro.marcaId.length === 0 &&
                    (!filtro.precio_venta.min && !filtro.precio_venta.max) &&
                    filtro.tamañoId.length === 0
                  ) {
                    return []; // Devuelve un array vacío si no hay filtros
                  } else {
                      return productos.filter((producto) => {
                        if (filtro.categoriaId && filtro.categoriaId.length > 0) {
                          if (!filtro.categoriaId.includes(producto.categoriaId)) {
                            return false;
                          }
                        }
                        if (filtro.marcaId && filtro.marcaId.length > 0) {
                          if (!filtro.marcaId.includes(producto.marcaId)) {
                            return false;
                          }
                        }
                    
                        if (filtro.precio_venta && filtro.precio_venta.min && filtro.precio_venta.max) {
                          const precioVenta = parseFloat(producto.precio_venta);
                          if (precioVenta < filtro.precio_venta.min || precioVenta > filtro.precio_venta.max) {
                            return false;
                          }
                        }
                    
                        if (filtro.tamañoId && filtro.tamañoId.length > 0) {
                          if (!filtro.tamañoId.includes(producto.tamañoId)) {
                            return false;
                          }
                        }
                        return true;
                      });
                  }
              };
              const productosFiltrados = filtrarProductos(state.productos, payload);
            return {
                ...state,
                productsFiltered: productosFiltrados
            };

        case CART_PRODUCTS:
            return {
                ...state,
                cartProducts: payload
            };

                case GETPRODUCT_BYNAME:
                return {
                    ...state,
                    searchResults: payload
                }
                case POST_CART_LS:
                    const itemsInCart = (id) =>{
                        return state.productos.find((prod)=>prod.id===id);
                    };
                    const { id, amount, color } = payload;  
                    console.log("color en reduce",color);               
                    if (amount>0){                                                           
                            const newItem = {...itemsInCart(id), color, amount}                                
                            const newItemsInCart = [...state.localCart, newItem];                                
                            localStorage.setItem("localCart", JSON.stringify(newItemsInCart));                                                 
                            return{
                                ...state,
                                localCart: newItemsInCart,
                            };                    
                    } else {
                        return {
                            ...state,
                            localCart:[]
                        }
                    }
    
                case EMPTY_LOCAL_CART:
                    localStorage.removeItem("localCart");
                    return {
                        ...state,
                        localCart:[]
                };

            case DELETE_ART_LS:        
            const { ArtId, ArtColor, cantidad } = payload;
            const indexToDelete = state.localCart.findIndex(
                item => item.id === ArtId && item.color === ArtColor);  
               
              if (indexToDelete !== -1) {
                const newLocalCart = [...state.localCart.slice(0, indexToDelete), ...state.localCart.slice(indexToDelete + 1)];                
                console.log("newLocalCart", newLocalCart);
                return {
                  ...state,
                  localCart: newLocalCart
                };
              }
              return state;

        case POST_CART_API:
            return {
                ...state,
                apiCart: data,
            };

        case DEL_ART_API:
            return{
                  ...state,
                  apiCart: data
            }
            case GET_USER_COMPRAS:
                return{
                      ...state,
                userCompras: data
                }
        case POST_ART_API:
            return {
                ...state,
                apiCart: data
            }      
    
        default:
        return state
    }
}

export default reducer;

