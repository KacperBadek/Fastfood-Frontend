import {Outlet} from "react-router-dom";
import SessionManager from "../SessionManager.jsx";

export default function Layout() {
    return (
        <>
            <main>
                <SessionManager>
                    <Outlet/>
                </SessionManager>
            </main>
        </>
    );
}