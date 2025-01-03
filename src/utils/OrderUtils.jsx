export const prepareItems = (orderItems) => {
    return orderItems.map(({name, selectedAddOns, quantity}) => ({
        productName: name,
        selectedAddOns: selectedAddOns.map(addon => ({
            name: addon.name,
            quantity: addon.quantity,
        })),
        quantity,
    }));
};

export const createOrderObject = ({
                                      deliveryOption,
                                      deliveryAddress,
                                      tableNumber,
                                      orderItems
                                  }) => {
    const currentDate = new Date();
    const orderTime = currentDate.toISOString().split(".")[0];

    return {
        sessionId: sessionStorage.getItem("sessionId"),
        items: prepareItems(orderItems),
        deliveryOption: deliveryOption,
        deliveryAddress: deliveryAddress,
        tableNumber: tableNumber,
        orderTime: orderTime
    };
};
