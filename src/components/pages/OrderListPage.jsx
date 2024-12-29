import {useContext} from "react";
import {GlobalContext} from "../../GlobalContext.jsx";
import {useNavigate} from "react-router-dom";

export default function OrderListPage() {
    const {state, dispatch, createOrder} = useContext(GlobalContext);
    const {orderItems, deliveryOption, tableNumber, deliveryAddress} = state;
    const navigate = useNavigate();


    const prepareItems = () => {
        return orderItems.map(({name, selectedAddOns, quantity}) => ({
            productName: name,
            selectedAddOns: selectedAddOns.map(addon => ({
                name: addon.name,
                quantity: addon.quantity,
            })),
            quantity,
        }));
    }

    const handleConfirmOrder = () => {
        const currentDate = new Date();
        const orderTime = currentDate.toISOString().split(".")[0];

        const newOrder = {
            sessionId: "1",
            items: prepareItems(),
            deliveryOption: deliveryOption,
            deliveryAddress: deliveryAddress,
            tableNumber: tableNumber,
            orderTime: orderTime
        }
        console.log(newOrder);
        createOrder(newOrder);
        //navigate("/payment")
    }

    const handleRemoveItem = (item) => {
        dispatch({type: "REMOVE_FROM_ORDER", orderItem: item})
    }

    return (
        <div>
            <h1>Order Summary</h1>
            {orderItems.length === 0 ? (
                <p>No items in your order.</p>
            ) : (
                <ul>
                    {orderItems.map((item, index) => (
                        <li key={index}>
                            <strong>{item.name}</strong>
                            <p>Quantity: {item.quantity}</p>
                            <p>Total Price: ${item.totalPrice.toFixed(2)}</p>
                            <button onClick={() => handleRemoveItem(item)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}

            <button onClick={handleConfirmOrder}>Confirm order</button>
        </div>
    )
}