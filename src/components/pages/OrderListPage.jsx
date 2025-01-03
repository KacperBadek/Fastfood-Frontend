import {useContext} from "react";
import {GlobalContext} from "../../GlobalContext.jsx";
import {useNavigate} from "react-router-dom";
import OrderProduct from "../OrderProduct.jsx";
import {getSessionInfo} from "../../http/session.jsx"
import {useSessionUtils} from "../../utils/SessionUtils.jsx"
import {createOrderObject} from "../../utils/OrderUtils";
import {createOrder} from "../../http/api.jsx";

export default function OrderListPage() {
    const {state} = useContext(GlobalContext);
    const {restartSession} = useSessionUtils();
    const {orderItems, deliveryOption, tableNumber, deliveryAddress} = state;
    const navigate = useNavigate();

    const handleConfirmOrder = async () => {
        getSessionInfo().then((response) => {
            console.log(response)
        })

        const newOrder = createOrderObject({
            deliveryOption,
            deliveryAddress,
            tableNumber,
            orderItems,
        });

        console.log(newOrder);

        try {
            await createOrder(newOrder);
            navigate("/payment");
        } catch (error) {
            console.log("Error submitting order:", error);
        }
    };

    const handleStartOver = () => {
        restartSession();
    }

    return (
        <div>
            <h1>Order Summary</h1>
            {orderItems.length === 0 ? (
                <p>No items in your order.</p>
            ) : (
                <ul>
                    {orderItems.map((item, index) => (
                        <li key={index}>
                            <OrderProduct index={index} product={item}/>
                        </li>
                    ))}
                </ul>
            )}

            <button onClick={handleConfirmOrder}>Confirm order</button>
            <button onClick={handleStartOver}>Start over</button>
        </div>
    )
}