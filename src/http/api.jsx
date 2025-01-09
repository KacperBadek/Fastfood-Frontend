import axios from "axios";

const API_URL = "http://localhost:8080";

export async function fetchProductsAndCategories() {
    return (await axios.get(API_URL + "/menus")).data;
}

export async function fetchOrderConfirmation() {
    return (await axios.get(API_URL + `/orders/confirm`, {withCredentials: true})).data;
}

export async function createOrder(newOrder) {
    return await axios.post(API_URL + "/orders/create", newOrder, {withCredentials: true});
}

export async function generatePayment(paymentData) {
    return await axios.post(API_URL + "/payments", paymentData, {withCredentials: true});
}

export async function login(userData) {
    return await axios.post(API_URL + "/users/login", userData, {withCredentials: true});
}

export async function logout() {
    return await axios.post(API_URL + "/users/logout", {}, {withCredentials: true});
}

export async function fetchSalesData() {
    return (await axios.get(API_URL + "/admin/sales", {withCredentials: true})).data;
}