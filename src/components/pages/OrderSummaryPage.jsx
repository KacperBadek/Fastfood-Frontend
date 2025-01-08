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
        <div className="p-6 space-y-6 text-center">
            <h1 className="text-4xl font-bold text-center">Order Summary</h1>
            {orderItems.length === 0 ? (
                <p className="text-center">No items in your order.</p>
            ) : (
                <ul>
                    {orderItems.map((item, index) => (
                        <li key={index} className="items-center justify-center">
                            <OrderProduct index={index} product={item}/>
                        </li>
                    ))}
                </ul>
            )}

            <div className="text-lg font-semibold text-center">
                Total price: {countTotalPrice}$
            </div>

            <div className="flex space-x-2 items-center justify-center">
                <button onClick={() => navigate("/menu")}>Go back</button>
                {orderItems.length > 0 && <button onClick={handleConfirmOrder} className="bg-blue-600 mx-2 text-white rounded hover:bg-blue-700">Confirm order</button>}
                <button onClick={handleStartOver} className="bg-red-600 mx-2 text-white rounded hover:bg-red-700">Start over</button>
            </div>

        </div>
    )
}