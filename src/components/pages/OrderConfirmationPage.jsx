import {useEffect, useRef, useState} from "react";
import {useReactToPrint} from "react-to-print";
import {fetchOrderConfirmation} from "../../http/api.jsx";
import OrderConfirmation from "../OrderConfirmation.jsx";
import {useSessionUtils} from "../../utils/SessionUtils.jsx"
import {useNavigate} from "react-router-dom";

export default function OrderConfirmationPage() {
    const [orderDetails, setOrderDetails] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const contentRef = useRef();
    const reactToPrintFn = useReactToPrint({contentRef});
    const {restartSession} = useSessionUtils();
    const navigate = useNavigate();

    const handleFinish = () => {
        navigate("/");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchOrderConfirmation();
                setOrderDetails(data);
            } catch (error) {
                setErrorMessage("Failed to load order details. Please try again.")
            }
        }
        const restart = async () => {
            await restartSession();
        }
        fetchData().then(() => {
            restart();
        });
    }, []);

    if (errorMessage) return <div className="text-center">{errorMessage}</div>;
    if (!orderDetails) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto p-6 border rounded-lg shadow-md space-y-6">
            <h1>Order Confirmation</h1>
            <div ref={contentRef}>
                <OrderConfirmation orderDetails={orderDetails}/>
            </div>
            <div>
                <button onClick={reactToPrintFn} disabled={!orderDetails}
                        className="bg-blue-600 mx-2 text-white rounded hover:bg-blue-700">Print Order
                </button>
                <button onClick={handleFinish} className="bg-red-600 mx-2 text-white rounded hover:bg-red-700">Finish
                </button>
            </div>

        </div>
    );
}

