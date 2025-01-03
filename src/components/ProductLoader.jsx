import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../GlobalContext.jsx"
import {fetchProductsAndCategories} from '../http/api.jsx'

export default function ProductLoader() {
    const {dispatch} = useContext(GlobalContext);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const storedProducts = JSON.parse(sessionStorage.getItem("products"));
                const storedCategories = JSON.parse(sessionStorage.getItem("categories"));

                if (storedProducts && storedCategories) {
                    dispatch({type: "SET_PRODUCTS", products: storedProducts});
                    dispatch({type: "SET_CATEGORIES", menuCategories: storedCategories});
                } else {
                    const {products, productTypes} = await fetchProductsAndCategories();
                    dispatch({type: "SET_PRODUCTS", products});
                    dispatch({type: "SET_CATEGORIES", menuCategories: productTypes});
                    sessionStorage.setItem("products", JSON.stringify(products));
                    sessionStorage.setItem("categories", JSON.stringify(productTypes));
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
