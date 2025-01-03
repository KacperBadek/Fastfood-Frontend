import {useEffect, useRef, useState} from "react";
import {useReactToPrint} from "react-to-print";
import {fetchOrderConfirmation} from "../../http/api.jsx";
import OrderConfirmation from "../OrderConfirmation.jsx";
import {useSessionUtils} from "../../utils/SessionUtils.jsx"

export default function OrderConfirmationPage() {
    const [orderDetails, setOrderDetails] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const contentRef = useRef();
    const reactToPrintFn = useReactToPrint({contentRef});
    const {restartSession} = useSessionUtils();

    const handleFinish = () => {
        restartSession();
    }

    useEffect(() => {
        fetchOrderConfirmation(sessionStorage.getItem("sessionId"))
            .then((data) => {
                setOrderDetails(data);
            })
            .catch((error) => {
                setErrorMessage("Failed to load order details. Please try again.")
            })
    }, []);

    if (!orderDetails) return <div>Loading...</div>;
    if (errorMessage) return <div>{errorMessage}</div>;

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

