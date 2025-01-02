import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = "http://localhost:8080/session";

export async function startSession() {
    return await axios.post(API_URL + "/start");
}

export async function endSession() {
    return await axios.post(API_URL + "/end");
}

export async function getSessionInfo() {
    return (await axios.get(API_URL)).data;
}