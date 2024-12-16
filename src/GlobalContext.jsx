import {createContext, useReducer, useState} from "react";
import axios from "axios";

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

const API_URL = "http://localhost:8080";

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [deliveryOption, setDeliveryOption] = useState(null);

    const fetchProductsAndCategories = async () => {
        try {
            const response = await axios.get(API_URL + "/menus");
            const {products, productTypes} = response.data;

            dispatch({type: "SET_PRODUCTS", products: products});
            dispatch({type: "SET_CATEGORIES", menuCategories: productTypes});
        } catch (error) {
            console.log("Nie udało się załadować produktów", error);
        }
    }

    const fetchOrder = async (orderId) => {
        try {
            const response = await axios.get(API_URL + `/orders/${orderId}`);
            const order = response.data;

        } catch (error) {
            console.log("Fetch order error: ", error);
        }
    }

    const fetchOrderSummary = async (orderId) => {
        try {
            const response = await axios.get(API_URL + `/orders/${orderId}/summary`);
            const orderSummary = response.data;
        } catch (error) {
            console.log("Fetch order summary error: ", error);
        }
    }

    const createOrder = async (newOrder) => {
        try {
            await axios.post(API_URL + "/orders/create", newOrder);
        } catch (error) {
            console.log("Create order error: ", error);
        }
    }

    const cancelOrder = async (orderId) => {
        try {
            await axios.put(API_URL + `/orders/${orderId}/cancel`);
        } catch (error) {
            console.log("Cancel order error: ", error);
        }
    }

    const generatePayment = async (paymentData) => {//orderId, paymentMethod
        try {
            await axios.post(API_URL + "/payments", paymentData);
        } catch (error) {
            console.log("Generate payment error: ", error);
        }
    }

    const login = async (userData) => {
        try {
            await axios.post(API_URL + "/users/login", userData);
        } catch (error) {
            console.log("Login error: ", error);
        }
    }

    const fetchSales = async () => {
        try {
            const response = await axios.get(API_URL + "/admin/sales");
            const sales = response.data;
        } catch (error) {
            console.log("Sales error: ", error);
        }
    }

    return (
        <GlobalContext.Provider value={{
            state,
            dispatch,
            deliveryOption,
            setDeliveryOption,
            fetchProductsAndCategories,
            fetchOrderSummary,
            createOrder,
            generatePayment
        }}>
            {children}
        </GlobalContext.Provider>
    );

}