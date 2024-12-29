import {useState} from "react";
import Modal from "./Modal.jsx";

export default function ProductPersonalizationModal({product, toggleModal, updateAddOns}) {
    const [quantities, setQuantities] = useState(
        product.addOns.reduce((acc, addon) => {
            acc[addon.name] = addon.quantity || 0;
            return acc;
        }, {})
    );

    const handleQuantityChange = (addonName, value) => {
        setQuantities({
            ...quantities,
            [addonName]: Math.max(0, value),
        });
    };

    const handleSave = () => {
        const updatedAddOns = product.addOns.map((addon) => ({
            ...addon,
            quantity: quantities[addon.name],
            totalPrice: addon.additionalPrice * quantities[addon.name],
        }));
        updateAddOns(updatedAddOns);
        toggleModal();
    };

    return (

        <Modal toggle={toggleModal}>
            <div>
                <h2>Personalization</h2>

                {product.addOns && product.addOns.length > 0 ? (
                    <ul>
                        {product.addOns.map((addon, index) => (
                            <li key={index}>
                                <div>
                                    <strong>{addon.name}</strong>
                                    <p>Price per unit: ${addon.additionalPrice.toFixed(2)}</p>
                                    <input
                                        type="number"
                                        min="0"
                                        value={quantities[addon.name]}
                                        onChange={(e) =>
                                            handleQuantityChange(addon.name, parseInt(e.target.value) || 0)
                                        }
                                    />
                                    <p>
                                        Total: $
                                        {(addon.additionalPrice * quantities[addon.name]).toFixed(2)}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No add-ons listed.</p>
                )}
            </div>

            <button onClick={handleSave}>Save</button>
        </Modal>
    );
}
