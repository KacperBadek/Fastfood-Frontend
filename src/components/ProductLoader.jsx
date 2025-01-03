import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../GlobalContext.jsx"
import {fetchProductsAndCategories} from '../http/api.jsx'

export default function ProductLoader() {
    const {dispatch} = useContext(GlobalContext);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const storedProducts = JSON.parse(localStorage.getItem("products"));
                const storedCategories = JSON.parse(localStorage.getItem("categories"));

                if (storedProducts && storedCategories) {
                    dispatch({type: "SET_PRODUCTS", products: storedProducts});
                    dispatch({type: "SET_CATEGORIES", menuCategories: storedCategories});
                } else {
                    const {products, productTypes} = await fetchProductsAndCategories();
                    dispatch({type: "SET_PRODUCTS", products});
                    dispatch({type: "SET_CATEGORIES", menuCategories: productTypes});
                    localStorage.setItem("products", JSON.stringify(products));
                    localStorage.setItem("categories", JSON.stringify(productTypes));
                }
            } catch (error) {
                console.error("Failed to load products and categories:", error);
                setErrorMessage("Failed to fetch products and categories");
            }
        };

        loadProducts();
    }, []);

    if (errorMessage) {
        return (
            <div>
                {errorMessage}
            </div>
        );
    }

    return null;
}
