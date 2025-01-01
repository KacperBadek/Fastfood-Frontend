import {useState} from "react";
import Modal from "./Modal.jsx";

export default function ProductPersonalizationModal({addOns, toggleModal, updateAddOns}) {
    const [quantities, setQuantities] = useState(
        addOns.reduce((acc, addon) => {
            acc[addon.name] = addon.quantity ?? addon.defaultQuantity;
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
        const updatedAddOns = addOns.map((addon) => {
            const defaultQuantity = addon.defaultQuantity;
            const adjustedQuantity = Math.max(0, quantities[addon.name]);
            const additionalQuantity = adjustedQuantity - defaultQuantity;

            return {
                ...addon,
                quantity: adjustedQuantity,
                totalPrice: additionalQuantity > 0
                    ? addon.additionalPrice * additionalQuantity
                    : 0,
            };
        });

        updateAddOns(updatedAddOns);
        toggleModal();
    };

    return (
        <Modal toggle={toggleModal}>
            <div>
                <h2>Personalization</h2>

                {addOns && addOns.length > 0 ? (
                    <ul>
                        {addOns.map((addon, index) => (
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
                                        {quantities[addon.name] > addon.defaultQuantity
                                            ? ((quantities[addon.name] - addon.defaultQuantity) * addon.additionalPrice).toFixed(2)
                                            : "0.00"}
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

