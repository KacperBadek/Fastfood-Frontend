import {endSession} from "../http/session.jsx";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {GlobalContext} from "../GlobalContext.jsx";

export function useSessionUtils() {
    const {dispatch} = useContext(GlobalContext);
    const navigate = useNavigate();

    const restartSession = async () => {
        dispatch({type: "CLEAR_ORDER"});
        dispatch({type: "CLEAR_FORM_DATA"})
        await endSession();
    };

    const restartSessionWithNavigate = async () => {
        await restartSession();
        navigate("/");
    }

    return {restartSession, restartSessionWithNavigate};
}
