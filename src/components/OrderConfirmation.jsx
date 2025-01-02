export default function OrderConfirmation({orderDetails}) {
    return (
        <div>
            <p><strong>Order Number:</strong> {orderDetails.orderNumber}</p>
            <p><strong>Status:</strong> {orderDetails.status}</p>
            <p><strong>Total Price:</strong> {orderDetails.totalPrice}</p>
            <p><strong>Delivery Option:</strong> {orderDetails.deliveryOption}</p>
            {orderDetails.deliveryOption === "DELIVERY" && (
                <p><strong>Delivery Address:</strong> {orderDetails.deliveryAddress}</p>
            )}
            {orderDetails.deliveryOption === "DINE_IN" && (
                <p><strong>Table Number:</strong> {orderDetails.tableNumber}</p>
            )}
            <p><strong>Estimated Time:</strong> {orderDetails.estimatedTime}</p>
        </div>
    )
}
