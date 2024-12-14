import {createContext, useReducer, useState} from "react";

const initialState = {
    products: [],
    menuCategories: []
}

function reducer(state, action) {
    switch (action.type) {
        case "SET_PRODUCTS":
            return {
                ...state,
                products: action.products,
            };
        case "SET_CATEGORIES":
            return {
                ...state,
                menuCategories: action.menuCategories,
            };
        default:
            return state;
    }
}

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [deliveryOption, setDeliveryOption] = useState(null);

    return (
        <GlobalContext.Provider value={{ state, dispatch, deliveryOption, setDeliveryOption }}>
            {children}
        </GlobalContext.Provider>
    );

}