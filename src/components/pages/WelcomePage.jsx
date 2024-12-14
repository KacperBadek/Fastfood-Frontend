import DeliveryOptionButton from "../DeliveryOptionButton.jsx";
import {useNavigate} from "react-router-dom";
import {GlobalContext} from "../../GlobalContext.jsx";
import {useContext} from "react";

export default function WelcomePage() {
    const {setDeliveryOption} = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleDeliveryOption = (option) => {
        setDeliveryOption(option);

        navigate("/menu");
    };

    return (
        <div>
            <h1>Welcome to the Home Page</h1>

            <h2>Gdzie zjesz dzisiaj?</h2>
            <DeliveryOptionButton handler={() => handleDeliveryOption("DINE_IN")} text="Na miejscu"/>
            <DeliveryOptionButton handler={() => handleDeliveryOption("TAKEOUT")} text="Na wynos"/>
            <DeliveryOptionButton handler={() => handleDeliveryOption("DELIVERY")} text="Dostawa"/>
        </div>
    )
}