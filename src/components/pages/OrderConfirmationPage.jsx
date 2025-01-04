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
        fetchData();
        restart();
    }, []);

    if (errorMessage) return <div>{errorMessage}</div>;
    if (!orderDetails) return <div>Loading...</div>;

    return (
        <div>
            <h1>Order Confirmation</h1>
            <div ref={contentRef}>
                <OrderConfirmation orderDetails={orderDetails}/>
            </div>
            <button onClick={reactToPrintFn} disabled={!orderDetails}>Print Order</button>
            <button onClick={handleFinish}>Finish</button>
        </div>
    );
}

