import {useState} from "react";
import ProductDetailsModal from "./ProductDetailsModal.jsx";
import ProductPersonalizationModal from "./ProductPersonalizationModal.jsx";
import Modal from "./Modal.jsx";

export default function ProductModal({product, toggleModal}) {

    const [detailsModal, setDetailsModal] = useState(false);
    const [personalizationModal, setPersonalizationModal] = useState(false);

    const toggleDetailsModal = (product) => {
        setDetailsModal(!detailsModal);
    };

    const togglePersonalization = (product) => {
        setPersonalizationModal(!personalizationModal);
    };


    return (
        <>
            <Modal toggle={toggleModal}>
                <img src={product.image} alt="photo"/>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: {product.price}$</p>
                <input type="number"/>
                <button>Add</button>
                <button onClick={togglePersonalization}>Personalise</button>
                <button onClick={toggleDetailsModal}>Info</button>
            </Modal>

            {detailsModal && (<ProductDetailsModal product={product} toggleModal={toggleDetailsModal}/>)}
            {personalizationModal && (<ProductPersonalizationModal product={product} toggleModal={togglePersonalization}/>)}
        </>
    );
}