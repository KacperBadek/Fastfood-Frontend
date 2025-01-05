import DeliveryOptionButton from "../DeliveryOptionButton.jsx";
import {useNavigate} from "react-router-dom";
import {GlobalContext} from "../../GlobalContext.jsx";
import {useContext, useState} from "react";
import DeliveryOptionForm from "../DeliveryOptionForm.jsx";
import {startSession} from "../../http/session.jsx";

const DeliveryOptions = {
    DINE_IN: "DINE_IN",
    TAKEOUT: "TAKEOUT",
    DELIVERY: "DELIVERY",
};

export default function WelcomePage() {
    const {state, dispatch} = useContext(GlobalContext);
    const [showForm, setShowForm] = useState(false);
    const {deliveryOption} = state;
    const navigate = useNavigate();

    const handleSession = async () => {
        try {
            await startSession();
        } catch (error) {
            console.log("Failed to start session", error);
        }
    };


    const handleDeliveryOption = (option) => {
        dispatch({
            type: "SET_DELIVERY_OPTION",
            option: option
        })

        if (option === DeliveryOptions.TAKEOUT) {
            dispatch({type: "CLEAR_TABLE_NUMBER"}, {type: "CLEAR_DELIVERY_ADDRESS"})
            handleSession().then(() => {
                navigate("/menu");
            });
        } else {
            setShowForm(true);
        }
    };

    const handleSubmit = (values) => {
        if (values.streetName || values.houseNumber || values.apartmentNumber) {
            const deliveryAddress = `${values.streetName} ${values.houseNumber}/${values.apartmentNumber}`;
            dispatch({
                type: "SET_DELIVERY_ADDRESS",
                deliveryAddress,
            }, {type: "CLEAR_TABLE_NUMBER"});
        }

        if (values.tableNumber) {
            dispatch({
                type: "SET_TABLE_NUMBER",
                tableNumber: values.tableNumber,
            }, {type: "CLEAR_DELIVERY_ADDRESS"});
        }

        setShowForm(false);
        handleSession().then(() => {
            navigate("/menu");
        });
    }

    return (
        <div>
            <h1 className="text-3xl font-bold">Welcome to our restaurant!</h1>
            <div>
                <h2>Where will you eat today?</h2>
                <DeliveryOptionButton handler={() => handleDeliveryOption(DeliveryOptions.DINE_IN)} text="Dine in"/>
                <DeliveryOptionButton handler={() => handleDeliveryOption(DeliveryOptions.TAKEOUT)} text="Takeout"/>
                <DeliveryOptionButton handler={() => handleDeliveryOption(DeliveryOptions.DELIVERY)} text="Delivery"/>
            </div>
            {showForm && (
                <DeliveryOptionForm deliveryOptions={DeliveryOptions} deliveryOption={deliveryOption}
                                    onSubmit={handleSubmit}/>
            )}
        </div>
    )
}