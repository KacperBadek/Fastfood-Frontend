import {useEffect, useLayoutEffect} from "react";
import {useNavigate} from "react-router-dom";

// const SESSION_TIMEOUT = 15 * 60 * 1000;
const SESSION_TIMEOUT = 10 * 1000;

export default function SessionManager() {
    const navigate = useNavigate();

    useLayoutEffect(() => {
        console.log("SessionManager initialized for sessionId:", document.cookie);
        let sessionTimeout;

        const resetSessionTimeout = () => {
            clearTimeout(sessionTimeout);

            sessionTimeout = setTimeout(() => {
                alert("Session expired.");
                sessionStorage.removeItem("sessionId");
                navigate("/");
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
    }, [navigate]);

    return null;
}
