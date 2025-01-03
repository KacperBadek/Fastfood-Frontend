export const generateUpdatedAddOns = (addOns, quantities) =>
    addOns.map((addon) => {
        const defaultQuantity = addon.defaultQuantity;
        const adjustedQuantity = Math.max(0, quantities[addon.name]);
        const additionalQuantity = adjustedQuantity - defaultQuantity;

        return {
            ...addon,
            quantity: adjustedQuantity,
            totalPrice: additionalQuantity > 0
                ? addon.additionalPrice * additionalQuantity
                : 0,
        };
    });