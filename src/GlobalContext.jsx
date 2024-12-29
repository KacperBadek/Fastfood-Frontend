import {createContext, useReducer, useState} from "react";
import axios from "axios";

const initialState = {
    products: [],
    menuCategories: [],
    deliveryOption: "",
    tableNumber: "",
    deliveryAddress: "",
    orderItems: [],
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
        case "SET_DELIVERY_OPTION":
            return {
                ...state,
                deliveryOption: action.option,
            }
        case "SET_TABLE_NUMBER":
            return {
                ...state,
                tableNumber: action.tableNumber,
            }
        case "SET_DELIVERY_ADDRESS":
            return {
                ...state,
                deliveryAddress: action.deliveryAddress,
            }
        case "ADD_TO_ORDER": {
            const itemIndex = state.orderItems.findIndex((item) => item.name === action.orderItem.name &&
                JSON.stringify(item.selectedAddOns) === JSON.stringify(action.orderItem.selectedAddOns));

            if (itemIndex !== -1) {
                console.log("INDEX TAKIEGO SAMEGO PRODUKTU: ", itemIndex);
                const updatedItems = [...state.orderItems];
                console.log("ILOŚĆ PRZED DODANIEM: ", updatedItems[itemIndex].quantity)
                updatedItems[itemIndex].quantity += action.orderItem.quantity;
                console.log("ILOŚĆ PO DODANIU: ", updatedItems[itemIndex].quantity)

                return {
                    ...state,
                    orderItems: updatedItems,
                }
            } else {
                console.log("DUPA")
                return {
                    ...state,
                    orderItems: [...state.orderItems, action.orderItem],
                }
            }
        }
        case"REMOVE_FROM_ORDER":
            return {
                ...state,
                orderItems: state.orderItems.filter((item) => item !== action.orderItem),
            }
        default:
            return state;
    }
}

const API_URL = "http://localhost:8080";

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

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
            await axios.post(API_URL + "/payments", paymentData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
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

    const fetchSalesData = async () => {
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
            fetchProductsAndCategories,
            fetchOrderSummary,
            createOrder,
            generatePayment,
            login,
            fetchSalesData,
        }}>
            {children}
        </GlobalContext.Provider>
    );

}