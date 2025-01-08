import {useCallback, useContext, useState} from "react";
import {GlobalContext} from "../GlobalContext.jsx";
import ProductDetailsModal from "./modals/ProductDetailsModal.jsx";
import ProductPersonalizationModal from "./modals/ProductPersonalizationModal.jsx";

export default function OrderProduct({index, product}) {
    const {state, dispatch} = useContext(GlobalContext);

    const [detailsModal, setDetailsModal] = useState(false);
    const [personalizationModal, setPersonalizationModal] = useState(false);

    const toggleDetailsModal = useCallback(() => {
        setDetailsModal((prev) => !prev);
    }, []);

    const togglePersonalization = useCallback(() => {
        setPersonalizationModal(prev => !prev)
    }, []);

    const updateAddOns = (updatedAddOns) => {
        dispatch({
            type: "UPDATE_ADD_ON",
            index,
            updatedAddOns,
        });
    }

    const handleQuantityUpdate = (quantity) => {
        dispatch({
            type: "UPDATE_PRODUCT_QUANTITY",
            index,
            quantity: parseInt(quantity, 10),
        });
    };


    const handleRemoveItem = (item) => {
        dispatch({type: "REMOVE_FROM_ORDER", orderItem: item})
    }

    return (
        <>
            <div className="max-w-xl mx-auto mt-4 space-y-4 space-x-8 flex items-center justify-center border border-gray-300 rounded-lg">
                <div className="text-center max-w-xs">
                    <img src={product.image} alt="image" className="object-contain w-full h-40 max-w-32 mt-4"/>
                    <strong>{product.name}</strong>
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <input
                        type="number"
                        value={product.quantity}
                        onChange={(e) => handleQuantityUpdate(e.target.value)}
                        className="w-16 p-1 rounded-md text-center"
                    />
                    <p>Price: ${product.totalPrice.toFixed(2)}</p>
                </div>

                <div className="flex flex-col space-y-2">
                    <button onClick={togglePersonalization}>Personalise</button>
                    <button onClick={toggleDetailsModal}>Info</button>
                    <button onClick={() => handleRemoveItem(product)}>Remove</button>
                </div>
            </div>

            {detailsModal && (<ProductDetailsModal product={product} toggleModal={toggleDetailsModal}/>)}
            {personalizationModal && (
                <ProductPersonalizationModal addOns={product.selectedAddOns} toggleModal={togglePersonalization}
                                             updateAddOns={updateAddOns}/>)}
        </>
    )
}