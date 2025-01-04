import {createContext, useReducer} from "react";
import {calculateTotalPrice} from "./utils/ProductUtils.jsx"

function saveOrderItemsToSessionStorage(orderItems) {
    sessionStorage.setItem("orderItems", JSON.stringify(orderItems));
}

function saveToSessionStorage(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

function removeFromSessionStorage(key) {
    sessionStorage.removeItem(key);
}


const initialState = {
    products: [],
    menuCategories: [],
    deliveryOption: JSON.parse(sessionStorage.getItem("deliveryOption")) || "",
    tableNumber: JSON.parse(sessionStorage.getItem("tableNumber")) || "",
    deliveryAddress: JSON.parse(sessionStorage.getItem("deliveryAddress")) || "",
    orderItems: JSON.parse(sessionStorage.getItem("orderItems")) || [],
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
            saveToSessionStorage("deliveryOption", action.option);
            return {
                ...state,
                deliveryOption: action.option,
            };
        case "SET_TABLE_NUMBER":
            saveToSessionStorage("tableNumber", action.tableNumber);
            return {
                ...state,
                tableNumber: action.tableNumber,
            }
        case "CLEAR_TABLE_NUMBER":
            removeFromSessionStorage("tableNumber");
            return {
                ...state,
                tableNumber: "",
            }
        case "SET_DELIVERY_ADDRESS":
            saveToSessionStorage("deliveryAddress", action.deliveryAddress);
            return {
                ...state,
                deliveryAddress: action.deliveryAddress,
            }
        case "CLEAR_DELIVERY_ADDRESS":
            removeFromSessionStorage("deliveryAddress");
            return {
                ...state,
                deliveryAddress: "",
            }
        case "CLEAR_FORM_DATA":
            removeFromSessionStorage("deliveryOption");
            removeFromSessionStorage("tableNumber");
            removeFromSessionStorage("deliveryAddress");
            return {
                ...state,
                deliveryOption: "",
                tableNumber: "",
                deliveryAddress: "",
            };
        case "ADD_TO_ORDER": {
            const itemIndex = state.orderItems.findIndex(
                (item) =>
                    item.name === action.orderItem.name &&
                    JSON.stringify(item.selectedAddOns) === JSON.stringify(action.orderItem.selectedAddOns)
            );

            let updatedItems;
            if (itemIndex !== -1) {
                updatedItems = [...state.orderItems];
                updatedItems[itemIndex].quantity += action.orderItem.quantity;
            } else {
                updatedItems = [...state.orderItems, action.orderItem];
            }

            saveOrderItemsToSessionStorage(updatedItems);
            return {
                ...state,
                orderItems: updatedItems,
            };
        }
        case "REMOVE_FROM_ORDER": {
            const updatedItems = state.orderItems.filter((item) => item !== action.orderItem);
            saveOrderItemsToSessionStorage(updatedItems);
            return {
                ...state,
                orderItems: updatedItems,
            };
        }
        case "UPDATE_PRODUCT_QUANTITY": {
            const updatedItems = state.orderItems.map((item, index) => {
                if (index === action.index) {
                    const updatedQuantity = Math.max(1, action.quantity);

                    const updatedTotalPrice = calculateTotalPrice(item.price, item.selectedAddOns, updatedQuantity);
                    return {
                        ...item,
                        quantity: updatedQuantity,
                        totalPrice: updatedTotalPrice,
                    };
                }
                return item;
            });
            saveOrderItemsToSessionStorage(updatedItems);

            return {
                ...state,
                orderItems: updatedItems,
            };
        }
        case "UPDATE_ADD_ON": {
            const {index, updatedAddOns} = action;

            const updatedItems = state.orderItems.map((item, itemIndex) => {
                if (itemIndex === index) {
                    const updatedTotalPrice = calculateTotalPrice(item.price, updatedAddOns, item.quantity);

                    return {
                        ...item,
                        selectedAddOns: updatedAddOns,
                        totalPrice: updatedTotalPrice,
                    };
                }
                return item;
            });

            saveOrderItemsToSessionStorage(updatedItems);
            return {
                ...state,
                orderItems: updatedItems,
            };
        }

        case "CLEAR_ORDER":
            sessionStorage.removeItem("orderItems")
            return {
                ...state,
                orderItems: [],
            }
        default:
            return state;
    }
}

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GlobalContext.Provider value={{
            state,
            dispatch,
        }}>
            {children}
        </GlobalContext.Provider>
    );

}