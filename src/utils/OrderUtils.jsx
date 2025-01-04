import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

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
    const orderTime = dayjs(currentDate).tz("Europe/Warsaw").format("YYYY-MM-DDTHH:mm:ss");

    return {
        items: prepareItems(orderItems),
        deliveryOption: deliveryOption,
        deliveryAddress: deliveryAddress,
        tableNumber: tableNumber,
        orderTime: orderTime
    };
};
