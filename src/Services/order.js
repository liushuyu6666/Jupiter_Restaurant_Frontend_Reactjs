import {del, get, post} from "./restClient";

const createOrder = (jwt, body) => {
    return post(`/v1/jupiter/orders`, jwt, body);
}

const listOrders = (jwt) => {
    return get(`/v1/jupiter/orders`, jwt);
}

export {
    createOrder,
    listOrders,
}