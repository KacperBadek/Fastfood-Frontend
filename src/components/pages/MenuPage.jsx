import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../GlobalContext.jsx";
import Product from "../Product.jsx";
import Sidebar from "../SideBar.jsx";

export default function MenuPage() {

    const {state, dispatch, fetchProductsAndCategories} = useContext(GlobalContext);
    const {products, menuCategories} = state;
    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
        fetchProductsAndCategories();
    }, []);

    const filteredProducts = selectedType
        ? products.filter((product) => product.type === selectedType)
        : products;

    return (
        <div className="">
            <h1>Menu</h1>

            <div className="flex">
                <Sidebar categories={menuCategories} selectedType={selectedType} onTypeSelect={setSelectedType}/>
                <div className="w-2/3 pl-4">
                    {products.length === 0 ? (
                        <p>No products available.</p>
                    ) : (
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product, index) => (
                                <li key={index}>
                                    <Product productData={product}/>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}