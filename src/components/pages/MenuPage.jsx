import {useCallback, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {GlobalContext} from "../../GlobalContext.jsx";
import Product from "../Product.jsx";
import Sidebar from "../SideBar.jsx";
import ProductModal from "../modals/ProductModal.jsx";

export default function MenuPage() {

    const {state} = useContext(GlobalContext);
    const {products, menuCategories, orderItems} = state;
    const [selectedType, setSelectedType] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productModal, setProductModal] = useState(false);
    const navigate = useNavigate();

    const toggleProductModal = useCallback((product) => {
        setSelectedProduct(product);
        setProductModal((prev) => !prev);
    }, []);


    const filteredProducts = selectedType
        ? products.filter((product) => product.type === selectedType)
        : products;

    return (
        <div className="text-center p-4">
            <h1 className="p-8">Menu</h1>

            <div className="flex">
                <Sidebar categories={menuCategories} selectedType={selectedType} onTypeSelect={setSelectedType}/>
                <div className="w-2/3 ml-8">
                    {products.length === 0 ? (
                        <p>No products available.</p>
                    ) : (
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product, index) => (
                                <li key={index} onClick={() => toggleProductModal(product)}>
                                    <Product productData={product}/>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {productModal && (<ProductModal product={selectedProduct} toggleModal={toggleProductModal}/>)}
            <div className="my-8">
                <button onClick={() => navigate("/")}>Go back</button>
                {orderItems.length > 0 && <button onClick={() => navigate("/order")}
                                                  className="bg-blue-600 mx-2 text-white rounded hover:bg-blue-700">Go
                    to your order</button>}
            </div>
        </div>
    )
}