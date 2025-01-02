import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import './App.css'
import SessionManager from "./SessionManager";

function App() {

    return (
        <>
            <RouterProvider router={router}>
                <SessionManager/>
            </RouterProvider>
        </>
    )
}

export default App
