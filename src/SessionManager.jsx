import {useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {useSessionUtils} from "./utils/SessionUtils.jsx"

//const SESSION_TIMEOUT = 5 * 1000;
const SESSION_TIMEOUT = 5 * 60 * 1000;
const exemptedRoutes = ['/', '/order-confirmation'];

export default function SessionManager({children}) {
    const navigate = useNavigate();
    const location = useLocation();
    const {restartSessionWithNavigate} = useSessionUtils();

    useEffect(() => {
        if (exemptedRoutes.includes(location.pathname)) return;

        let sessionTimeout;

        const resetSessionTimeout = () => {
            clearTimeout(sessionTimeout);

            sessionTimeout = setTimeout(async () => {
                alert("Session expired.");
                await restartSessionWithNavigate();
            }, SESSION_TIMEOUT);
        };

        const handleActivity = () => {
            resetSessionTimeout();
        };

        window.addEventListener("mousemove", handleActivity);
        window.addEventListener("click", handleActivity);
        window.addEventListener("scroll", handleActivity);
        window.addEventListener("keydown", handleActivity);

        return () => {
            window.removeEventListener("mousemove", handleActivity);
            window.removeEventListener("click", handleActivity);
            window.removeEventListener("scroll", handleActivity);
            window.removeEventListener("keydown", handleActivity);
            clearTimeout(sessionTimeout);
        };
    }, [navigate, location.pathname]);

    return children;
}
