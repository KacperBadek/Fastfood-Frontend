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

    if (errorMessage) return <div className="text-center text-lg font-semibold text-red-600 py-10">{errorMessage}</div>;
    if (!salesData) return <div className="text-center text-lg font-medium py-10">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto p-6 ">
            <div className="rounded-lg shadow-md">
                <h1 className="text-4xl text-center mb-6">Sales Report</h1>
                <div className="space-y-4 text-left">
                    <p className="text-xl">
                        <strong>Total Orders:</strong> {salesData.totalOrders}
                    </p>
                    <p className="text-xl">
                        <strong>Total Revenue:</strong> {salesData.totalRevenue.toFixed(2)}$
                    </p>

                    <h2 className="text-xl mt-8">Orders by Status:</h2>
                    {Object.keys(salesData.ordersByStatus).length > 0 ? (
                        <ul className="list-disc pl-6">
                            {Object.entries(salesData.ordersByStatus).map(([status, count]) => (
                                <li key={status} className="text-sm">
                                    {status}: {count}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm">No orders</p>
                    )}

                    <h2 className="text-xl mt-8">Orders by Delivery Option:</h2>
                    {Object.keys(salesData.ordersByDeliveryOption).length > 0 ? (
                        <ul className="list-disc pl-6">
                            {Object.entries(salesData.ordersByDeliveryOption).map(([option, count]) => (
                                <li key={option} className="text-sm">
                                    {option}: {count}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm">No orders</p>
                    )}
                </div>
            </div>
            <button onClick={handleLogout}
                    className="bg-blue-500 text-white px-4 mt-6 rounded hover:bg-blue-600">Logout
            </button>
        </div>
    );

}