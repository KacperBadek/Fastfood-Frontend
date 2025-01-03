import {createContext, useReducer} from "react";

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
                const updatedItems = [...state.orderItems];
                updatedItems[itemIndex].quantity += action.orderItem.quantity;
                return {
                    ...state,
                    orderItems: updatedItems,
                }
            } else {
                return {
                    ...state,
                    orderItems: [...state.orderItems, action.orderItem],
                }
            }
        }
        case"REMOVE_FROM_ORDER": {
            return {
                ...state,
                orderItems: state.orderItems.filter((item) => item !== action.orderItem),
            }
        }
        case "UPDATE_PRODUCT_QUANTITY": {
            const updatedItems = state.orderItems.map((item, index) => {
                if (index === action.index) {
                    const updatedQuantity = Math.max(1, action.quantity);

                    const calculateTotalPrice = (basePrice, addons, quantity) => {
                        const addonsTotalPrice = addons.reduce((acc, addon) => acc + addon.totalPrice, 0);
                        return (basePrice + addonsTotalPrice) * quantity;
                    };

                    const updatedTotalPrice = calculateTotalPrice(item.price, item.selectedAddOns, updatedQuantity);
                    return {
                        ...item,
                        quantity: updatedQuantity,
                        totalPrice: updatedTotalPrice,
                    };
                }
                return item;
            });

            return {
                ...state,
                orderItems: updatedItems,
            };
        }
        case "UPDATE_ADD_ON": {
            const {index, updatedAddOns} = action;

            const updatedItems = state.orderItems.map((item, itemIndex) => {
                if (itemIndex === index) {

                    const calculateTotalPrice = (basePrice, addons, quantity) => {
                        const addonsTotalPrice = addons.reduce((acc, addon) => acc + addon.totalPrice, 0);
                        return (basePrice + addonsTotalPrice) * quantity;
                    };

                    const updatedTotalPrice = calculateTotalPrice(item.price, updatedAddOns, item.quantity);

                    return {
                        ...item,
                        selectedAddOns: updatedAddOns,
                        totalPrice: updatedTotalPrice,
                    };
                }
                return item;
            });

            return {
                ...state,
                orderItems: updatedItems,
            };
        }

        case "CLEAR_ORDER":
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