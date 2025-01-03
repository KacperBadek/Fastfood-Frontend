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
            <div>
                <strong>{product.name}</strong>
                Quantity:
                <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => handleQuantityUpdate(e.target.value)}
                />
                <p>Price: ${product.totalPrice.toFixed(2)}</p>
                <button onClick={togglePersonalization}>Personalise</button>
                <button onClick={toggleDetailsModal}>Info</button>
                <button onClick={() => handleRemoveItem(product)}>Remove</button>
            </div>

            {detailsModal && (<ProductDetailsModal product={product} toggleModal={toggleDetailsModal}/>)}
            {personalizationModal && (
                <ProductPersonalizationModal addOns={product.selectedAddOns} toggleModal={togglePersonalization}
                                             updateAddOns={updateAddOns}/>)}
        </>
    )
}