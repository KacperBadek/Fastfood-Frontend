import {useState, useContext, useCallback} from "react";
import ProductDetailsModal from "./ProductDetailsModal.jsx";
import ProductPersonalizationModal from "./ProductPersonalizationModal.jsx";
import Modal from "./Modal.jsx";
import {createDefaultAddOns, calculateTotalPrice, finalizeOrder} from '../../utils/ProductUtils.jsx';
import {GlobalContext} from "../../GlobalContext.jsx";

export default function ProductModal({product, toggleModal}) {

    const {dispatch} = useContext(GlobalContext);
    const [quantity, setQuantity] = useState(1);
    const [personalizedAddOns, setPersonalizedAddOns] = useState([]);
    const [detailsModal, setDetailsModal] = useState(false);
    const [personalizationModal, setPersonalizationModal] = useState(false);

    const toggleDetailsModal = useCallback(() => {
        setDetailsModal((prev) => !prev);
    }, []);

    const togglePersonalization = useCallback(() => {
        setPersonalizationModal(prev => !prev)
    }, []);

    const updateAddOns = useCallback((updatedAddOns) => {
        setPersonalizedAddOns(updatedAddOns);
    }, []);

    const handleAddToOrder = () => {
        if (!personalizedAddOns.length) {
            const defaultAddOns = createDefaultAddOns(product);
            finalizeOrder(product, defaultAddOns, quantity, calculateTotalPrice, dispatch);
        } else {
            finalizeOrder(product, personalizedAddOns, quantity, calculateTotalPrice, dispatch);
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