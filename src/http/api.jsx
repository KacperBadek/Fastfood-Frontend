import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = "http://localhost:8080";

export async function fetchProductsAndCategories() {
    return (await axios.get(API_URL + "/menus")).data;
}

export async function fetchOrderConfirmation(sessionId) {
    return (await axios.get(API_URL + `/orders/${sessionId}/confirm`)).data;
}

export async function createOrder(newOrder) {
    return await axios.post(API_URL + "/orders/create", newOrder);
}

export async function cancelOrder(sessionId) {
    return await axios.put(API_URL + `/orders/${sessionId}/cancel`);
}

export async function generatePayment(paymentData) {
    return await axios.post(API_URL + "/payments", paymentData);
}

export async function login(userData) {
    return await axios.post(API_URL + "/users/login", userData);
}

export async function fetchSalesData() {
    return (await axios.get(API_URL + "/admin/sales")).data;
}