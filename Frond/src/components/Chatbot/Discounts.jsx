// import { useEffect } from "react"

// export function Discounts(props){

//     const {setState} = props

//     useEffect(()=>{
//         axios('https://localhost:3001/products/')
//         .then(data => data.json())
//         .then(res => {
//             let products = res.slice(0,5)
//             setState((state) => ({...state, products: products}))
//         })
//         console.log(props)
//     },
//      // eslint-disable-next-line 
//     [])
//     return <div>
//         <h4 style={{fontWeight:"bold"}}>¡Tenemos descuentos en nuestros productos!!</h4>
//         <ol>

//         {props.products && props.products.map(p => <li>{p.name}</li> )}
//         </ol>
//     </div>
// }