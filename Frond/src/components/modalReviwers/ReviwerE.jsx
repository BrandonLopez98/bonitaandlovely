import StarRatings from 'react-star-ratings';
import { useEffect, useState  } from "react";
import axios from 'axios';

export default function EditReviewModal({ product, currentUser}) {
    const [showModal, setShowModal] = useState(false);
    const [newRating, setNewRating] = useState(null); // Inicializa el rating en null
    const [newComentario, setNewComentario] = useState('');
    const [apiLoaded, setApiLoaded] = useState(false);
    const currentUserNumber = currentUser.split('-')[1]; // Esto asume que el formato siempre es "cli-{número}"
    console.log(product)
    useEffect(() => {
        // Llamada a la API para buscar la reseña del cliente en el producto
       const {data} =  axios.get(`/reviewr/${product}`)
       const review = data?.find(item => item.clienteId === currentUserNumber);
       if(review){
        setNewRating(review.rating);
        setNewComentario(review.comentario);
       }
       else{
        setApiLoaded(false)
       }
    }, [product, currentUserNumber]);

    const onChangeRating = (rating) => {
        setNewRating(rating);
    }

    const handleComentarioChange = (event) => {
        setNewComentario(event.target.value);
    }

    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(
                `/reviewr/${product}/${currentUserNumber}`, // Cambia currentUser por currentUser.id
                {
                    rating: newRating,
                    comentario: newComentario
                }
            );
            console.log(response.data);
    
            setShowModal(false);
        } catch (error) {
            console.error('Error al editar la reseña:', error.message);
        }
    }
    
    return (
        <>
            <button
                className="bg-gray-400 hover:bg-gray-500 text-gray-900 font-semibold py-2 px-4 rounded-md"
                onClick={() => setShowModal(true)}
            >
                Editar reseña
            </button>
            {showModal ? (
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-5">
                            <h2 className="text-2xl font-semibold">
                                Editar reseña
                            </h2>
                            <StarRatings
                                 rating={newRating !== null ? newRating : 0}
                                starHoverColor="orange"
                                starEmptyColor="gray"
                                starRatedColor="orange"
                                changeRating={onChangeRating}
                                numberOfStars={5}
                                starDimension="30px"
                                name='rating'
                            />
                            <textarea
                                value={newComentario}
                                onChange={handleComentarioChange}
                                cols="30"
                                rows="10"
                                className="resize-none h-24 border-solid border-2 border-slate-500 rounded"
                            ></textarea>
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={handleSaveChanges}
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
