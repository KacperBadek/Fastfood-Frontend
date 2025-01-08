import {useCallback, useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {useSessionUtils} from "./utils/SessionUtils.jsx"
import {getSessionInfo} from "./http/session.jsx";
import SessionExpiredModal from "./components/modals/SessionExpiredModal.jsx"

//const SESSION_TIMEOUT = 5 * 1000;
const SESSION_TIMEOUT = 10 * 60 * 1000;
const exemptedRoutes = ['/', '/order-confirmation', '/login'];

async function isSessionActive() {
    try {
        const sessionInfo = await getSessionInfo();
        return sessionInfo !== "No existing session.";
    } catch (error) {
        console.log("Error checking session status:", error);
        return false;
    }
}

export default function SessionManager({children}) {
    const navigate = useNavigate();
    const location = useLocation();
    const {restartSessionWithNavigate, restartSession} = useSessionUtils();
    const [sessionModal, setSessionModal] = useState(false);

    const toggleSessionModal = useCallback(() => {
        setSessionModal((prev) => !prev);
    }, [])

    useEffect(() => {
        if (exemptedRoutes.includes(location.pathname)) {
            return;
        }

        let sessionTimeout;
        const resetSessionTimeout = () => {
            clearTimeout(sessionTimeout);

            sessionTimeout = setTimeout(() => {
                console.log("Session timeout");

                restartSessionWithNavigate().then(() => {
                    toggleSessionModal();
                });
            }, SESSION_TIMEOUT);
        };

        const handleActivity = () => {
            resetSessionTimeout();
        };

        const checkSession = () => {
            isSessionActive().then((session) => {
                if (!session) {
                    restartSessionWithNavigate().then(() => {
                        toggleSessionModal();
                    })
                }
            })
        }

        window.addEventListener("mousemove", handleActivity);
        window.addEventListener("click", handleActivity);
        window.addEventListener("scroll", handleActivity);
        window.addEventListener("keydown", handleActivity);

        resetSessionTimeout();
        checkSession();

        return () => {
            window.removeEventListener("mousemove", handleActivity);
            window.removeEventListener("click", handleActivity);
            window.removeEventListener("scroll", handleActivity);
            window.removeEventListener("keydown", handleActivity);
            clearTimeout(sessionTimeout);
        };
    }, [location.pathname, navigate]);

    return (
        <>
            {children}
            {sessionModal && <SessionExpiredModal message="Session has expired." toggleModal={toggleSessionModal}/>}
        </>
    );
}
