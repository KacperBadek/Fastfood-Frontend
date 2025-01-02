import {useEffect, useState} from "react";
import {fetchSalesData} from '../../http/api.jsx'

export default function SalesPage() {
    const [salesData, setSalesData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchSalesData()
            .then((data) => {
                setSalesData(data);
            })
            .catch((error) => {
                setErrorMessage("Failed to load order details. Please try again.")
            })
    }, []);

    if (!salesData) return <div>Loading...</div>;
    if (errorMessage) return <div>{errorMessage}</div>;

    return (
        <div>
            <h1>Sales Report</h1>
            <div>
                <p><strong>Total Orders:</strong> {salesData.totalOrders}</p>
                <p><strong>Total Revenue:</strong> {salesData.totalRevenue}</p>

                <h2>Orders by Status</h2>
                <ul>
                    {Object.entries(salesData.ordersByStatus).map(([status, count]) => (
                        <li key={status}>
                            {status}: {count}
                        </li>
                    ))}
                </ul>

                <h2>Orders by Delivery Option</h2>
                <ul>
                    {Object.entries(salesData.ordersByDeliveryOption).map(([option, count]) => (
                        <li key={option}>
                            {option}: {count}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}