import {createBrowserRouter} from "react-router-dom";
import WelcomePage from "./components/pages/WelcomePage.jsx";
import ErrorPage from "./components/pages/ErrorPage.jsx";
import MenuPage from "./components/pages/MenuPage.jsx";
import Layout from "./layout/Layout.jsx";
import PaymentPage from "./components/pages/PaymentPage.jsx";
import OrderListPage from "./components/pages/OrderListPage.jsx";
import OrderSummaryPage from "./components/pages/OrderSummaryPage.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import SalesPage from "./components/pages/SalesPage.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <WelcomePage/>,
            },
            {
                path: "menu",
                element: <MenuPage/>,
            },
            {
                path: "order",
                element: <OrderListPage/>,
            },
            {
                path: "order-summary",
                element: <OrderSummaryPage/>,
            },
            {
                path: "payment",
                element: <PaymentPage/>,
            },
            {
                path: "login",
                element: <LoginPage/>
            },
            {
                path: "sales",
                element: <SalesPage/>,
            }
        ],
    }
])

export default router