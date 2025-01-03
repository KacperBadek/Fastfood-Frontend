export const createDefaultAddOns = (product) =>
    product.addOns.map((addon) => ({
        ...addon,
        quantity: addon.defaultQuantity,
        totalPrice: 0,
    }));

export const calculateTotalPrice = (basePrice, addons, quantity) => {
    const addonsTotalPrice = addons.reduce((acc, addon) => acc + addon.totalPrice, 0);
    return (basePrice + addonsTotalPrice) * quantity;
};

export const finalizeOrder = (product, selectedAddOns, quantity, calculateTotalPrice, dispatch) => {
    const productWithPersonalization = {
        ...product,
        selectedAddOns,
        quantity,
        totalPrice: calculateTotalPrice(product.price, selectedAddOns, quantity),
    };

    console.log(productWithPersonalization);
    dispatch({type: "ADD_TO_ORDER", orderItem: productWithPersonalization});
};
