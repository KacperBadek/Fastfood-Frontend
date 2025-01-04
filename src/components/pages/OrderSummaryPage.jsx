import {useContext, useMemo} from "react";
import {GlobalContext} from "../../GlobalContext.jsx";
import {useNavigate} from "react-router-dom";
import OrderProduct from "../OrderProduct.jsx";
import {useSessionUtils} from "../../utils/SessionUtils.jsx"

export default function OrderSummaryPage() {
    const {state} = useContext(GlobalContext);
    const {restartSessionWithNavigate} = useSessionUtils();
    const {orderItems} = state;
    const navigate = useNavigate();

    const countTotalPrice = useMemo(() => {
        return orderItems.reduce((total, item) => total + item.totalPrice, 0).toFixed(2);
    }, [orderItems]);

    const handleConfirmOrder = async () => {
        try {
            navigate("/payment");
        } catch (error) {
            console.log("Error submitting order:", error);
        }
    };

    const handleStartOver = async () => {
        await restartSessionWithNavigate();
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

            <div>
                Total price: {countTotalPrice}$
            </div>

            <button onClick={handleConfirmOrder}>Confirm order</button>
            <button onClick={handleStartOver}>Start over</button>
        </div>
    )
}