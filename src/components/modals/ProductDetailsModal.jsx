import Modal from "./Modal.jsx";

export default function ProductDetailsModal({product, toggleModal}) {

    return (
        <Modal toggle={toggleModal}>
            <div>
                <strong>Ingredients:</strong>
                {product.ingredients && product.ingredients.length > 0 ? (
                    <ul>
                        {product.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No ingredients listed.</p>
                )}
            </div>

            <div>
                <strong>Allergens:</strong>
                {product.allergens && product.allergens.length > 0 ? (
                    <ul>
                        {product.allergens.map((allergen, index) => (
                            <li key={index}>{allergen}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No allergens listed.</p>
                )}
            </div>

            <div>
                <strong>Calories:</strong>
                <p>{product.calories} kcal</p>
            </div>
        </Modal>
    )
}