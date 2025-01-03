import {useState} from "react";
import {generateUpdatedAddOns} from "../../utils/AddOnUtils.jsx"
import Modal from "./Modal.jsx";
import AddOn from "../AddOn.jsx";

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
       const updatedAddOns = generateUpdatedAddOns(addOns, quantities);
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
                            <AddOn
                                key={index}
                                addon={addon}
                                quantity={quantities[addon.name]}
                                onQuantityChange={handleQuantityChange}
                            />
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

