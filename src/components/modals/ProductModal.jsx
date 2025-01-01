import {useState, useContext} from "react";
import ProductDetailsModal from "./ProductDetailsModal.jsx";
import ProductPersonalizationModal from "./ProductPersonalizationModal.jsx";
import Modal from "./Modal.jsx";
import {GlobalContext} from "../../GlobalContext.jsx";

export default function ProductModal({product, toggleModal}) {

    const {state, dispatch} = useContext(GlobalContext);
    const [quantity, setQuantity] = useState(1);
    const [personalizedAddOns, setPersonalizedAddOns] = useState([]);
    const [detailsModal, setDetailsModal] = useState(false);
    const [personalizationModal, setPersonalizationModal] = useState(false);

    const toggleDetailsModal = (product) => {
        setDetailsModal(!detailsModal);
    };

    const togglePersonalization = (product) => {
        setPersonalizationModal(!personalizationModal);
    };

    const updateAddOns = (updatedAddOns) => {
        setPersonalizedAddOns(updatedAddOns);
    }

    const handleAddToOrder = () => {
        const createDefaultAddOns = () =>
            product.addOns.map((addon) => ({
                ...addon,
                quantity: addon.defaultQuantity,
                totalPrice: 0,
            }));

        const calculateTotalPrice = (basePrice, addons, quantity) => {
            const addonsTotalPrice = addons.reduce((acc, addon) => acc + addon.totalPrice, 0);
            return (basePrice + addonsTotalPrice) * quantity;
        };

        const finalizeOrder = (selectedAddOns) => {
            const productWithPersonalization = {
                ...product,
                selectedAddOns,
                quantity,
                totalPrice: calculateTotalPrice(product.price, selectedAddOns, quantity),
            };

            console.log(productWithPersonalization);
            dispatch({type: "ADD_TO_ORDER", orderItem: productWithPersonalization});
            //toggleModal();
        };

        if (!personalizedAddOns.length) {
            const defaultAddOns = createDefaultAddOns();
            finalizeOrder(defaultAddOns);
        } else {
            finalizeOrder(personalizedAddOns);
        }
    };


    return (
        <>
            <Modal toggle={toggleModal}>
                <img src={product.image} alt="photo"/>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: {product.price}$</p>
                <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}/>
                <button onClick={handleAddToOrder}>Add</button>
                <button onClick={togglePersonalization}>Personalise</button>
                <button onClick={toggleDetailsModal}>Info</button>
            </Modal>

            {detailsModal && (<ProductDetailsModal product={product} toggleModal={toggleDetailsModal}/>)}
            {personalizationModal && (
                <ProductPersonalizationModal addOns={product.addOns} toggleModal={togglePersonalization}
                                             updateAddOns={updateAddOns}/>)}
        </>
    );
}