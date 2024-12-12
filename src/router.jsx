import {createBrowserRouter} from "react-router-dom";
import WelcomePage from "./components/pages/WelcomePage.jsx";
import ErrorPage from "./components/pages/ErrorPage.jsx";
import MenuPage from "./components/pages/MenuPage.jsx";
import Layout from "./layout/Layout.jsx";

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
        ],
    }
])

export default router