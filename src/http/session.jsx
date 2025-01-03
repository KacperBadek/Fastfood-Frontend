import axios from "axios";

const API_URL = "http://localhost:8080/session";

export async function startSession() {
    return await axios.post(API_URL + "/start", {},{withCredentials: true});
}

export async function endSession() {
    return await axios.post(API_URL + "/end", {},{withCredentials: true});
}

export async function getSessionInfo() {
    return (await axios.get(API_URL, {withCredentials: true})).data;
}