import {endSession} from "../http/session.jsx";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {GlobalContext} from "../GlobalContext.jsx";

export function useSessionUtils() {
    const {dispatch} = useContext(GlobalContext);
    const navigate = useNavigate();

    const restartSession = () => {
        dispatch({type: "CLEAR_ORDER"});
        dispatch({type: "SET_DELIVERY_OPTION", deliveryOption: ""});
        dispatch({type: "SET_TABLE_NUMBER", tableNumber: ""});
        dispatch({type: "SET_DELIVERY_ADDRESS", deliveryAddress: ""});
        sessionStorage.removeItem("sessionId");
        endSession();
        navigate("/");
    };

    return {restartSession};
}
