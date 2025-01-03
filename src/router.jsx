import {createBrowserRouter} from "react-router-dom";
import WelcomePage from "./components/pages/WelcomePage.jsx";
import ErrorPage from "./components/pages/ErrorPage.jsx";
import MenuPage from "./components/pages/MenuPage.jsx";
import Layout from "./layout/Layout.jsx";
import PaymentPage from "./components/pages/PaymentPage.jsx";
import OrderSummaryPage from "./components/pages/OrderSummaryPage.jsx";
import OrderConfirmationPage from "./components/pages/OrderConfirmationPage.jsx";
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
                element: <OrderSummaryPage/>,
            },
            {
                path: "order-confirmation",
                element: <OrderConfirmationPage/>,
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