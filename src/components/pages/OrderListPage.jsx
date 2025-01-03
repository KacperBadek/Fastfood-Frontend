import {useContext} from "react";
import {GlobalContext} from "../../GlobalContext.jsx";
import {useNavigate} from "react-router-dom";
import OrderProduct from "../OrderProduct.jsx";
import {getSessionInfo} from "../../http/session.jsx"
import {useSessionUtils} from "../../utils/SessionUtils.jsx"
import {createOrder} from "../../http/api.jsx";

export default function OrderListPage() {
    const {state} = useContext(GlobalContext);
    const {restartSession} = useSessionUtils();
    const {orderItems, deliveryOption, tableNumber, deliveryAddress} = state;
    const navigate = useNavigate();


    const prepareItems = () => {
        return orderItems.map(({name, selectedAddOns, quantity}) => ({
            productName: name,
            selectedAddOns: selectedAddOns.map(addon => ({
                name: addon.name,
                quantity: addon.quantity,
            })),
            quantity,
        }));
    }

    const handleConfirmOrder = async () => {
        getSessionInfo().then((response) => {
            console.log(response)
        })

        const currentDate = new Date();
        const orderTime = currentDate.toISOString().split(".")[0];

        const newOrder = {
            sessionId: sessionStorage.getItem("sessionId"),
            items: prepareItems(),
            deliveryOption: deliveryOption,
            deliveryAddress: deliveryAddress,
            tableNumber: tableNumber,
            orderTime: orderTime
        }
        console.log(newOrder);

        try {
            await createOrder(newOrder);
            navigate("/payment")
        } catch (error) {
            console.log("Error submiting order:", error)
        }
    }

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