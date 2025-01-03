import {useEffect, useState} from "react";
import {fetchSalesData} from '../../http/api.jsx'
import {logout} from '../../http/api.jsx'
import {useNavigate} from "react-router-dom";

export default function SalesPage() {
    const [salesData, setSalesData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchSalesData();
                setSalesData(data);
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    setErrorMessage("You are not allowed to be here 😡.");
                } else {
                    setErrorMessage("An error has occurred. Try again later.");
                }
            }
        };

        fetchData();
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/")
        } catch (error) {
            console.log("Logout error: ", error);
        }
    }

    if (errorMessage) return <div>{errorMessage}</div>;
    if (!salesData) return <div>Loading...</div>;

    return (
        <div>
            <h1>Sales Report</h1>
            <div>
                <p>
                    <strong>Total Orders:</strong> {salesData.totalOrders}
                </p>
                <p>
                    <strong>Total Revenue:</strong> {salesData.totalRevenue.toFixed(2)}$
                </p>

                <h2>Orders by Status</h2>
                {Object.keys(salesData.ordersByStatus).length > 0 ? (
                    <ul>
                        {Object.entries(salesData.ordersByStatus).map(([status, count]) => (
                            <li key={status}>
                                {status}: {count}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No orders</p>
                )}

                <h2>Orders by Delivery Option</h2>
                {Object.keys(salesData.ordersByDeliveryOption).length > 0 ? (
                    <ul>
                        {Object.entries(salesData.ordersByDeliveryOption).map(([option, count]) => (
                            <li key={option}>
                                {option}: {count}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No orders</p>
                )}
            </div>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );

}