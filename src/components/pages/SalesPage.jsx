import {useEffect, useContext, useState} from "react";
import {GlobalContext} from "../../GlobalContext.jsx";

export default function SalesPage() {
    const {fetchSalesData} = useContext(GlobalContext);
    const [salesData, setSalesData] = useState({});
    const [error, setError] = useState("");

    const loadSalesData = async () => {
        try {
            const data = await fetchSalesData();
            setSalesData(data);
            setError("");
        } catch (err) {
            setError("Error.");
        }
    };

    useEffect(() => {
        loadSalesData();
    }, []);

    return (
        <div>
            <h1>Sales Report</h1>

            {error && <p>{error}</p>}

            {!salesData ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <p><strong>Total Orders:</strong> {salesData.totalOrders}</p>
                    <p><strong>Total Revenue:</strong> ${salesData.totalRevenue.toFixed(2)}</p>

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
            )}
        </div>
    )
}