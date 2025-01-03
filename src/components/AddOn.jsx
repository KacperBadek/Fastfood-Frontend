export default function AddOn({addon, quantity, onQuantityChange}) {
    return (
        <li>
            <div>
                <strong>{addon.name}</strong>
                <p>Price per unit: ${addon.additionalPrice.toFixed(2)}</p>
                <input
                    type="number"
                    min="0"
                    value={quantity}
                    onChange={(e) =>
                        onQuantityChange(addon.name, parseInt(e.target.value) || 0)
                    }
                />
                <p>
                    Total: $
                    {quantity > addon.defaultQuantity
                        ? ((quantity - addon.defaultQuantity) * addon.additionalPrice).toFixed(2)
                        : "0.00"}
                </p>
            </div>
        </li>
    )
}