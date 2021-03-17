import {del, get, post} from "./restClient";

const createDish = (jwt, body) => {
    return post(`/v1/jupiter/dishes`, jwt, body);
}

const listDishesInShop = (shopId) => {
    return get(`/v1/jupiter/shops/${shopId}/dishes`, null);
}

const listDishesUnderOwner = (shopId, jwt) => {
    return get(`/v1/jupiter/manage/shops/${shopId}/dishes`, jwt);
}

const retrieveDishUnderOwner = (shopId, dishId, jwt) => {
    return get(`/v1/jupiter/shops/${shopId}/dishes/${dishId}`, jwt);
}

const updateDish = (shopId, jwt, body) => {
    return post(`/v1/jupiter/dishes/${shopId}`, jwt, body);
}

const deleteDish = (dishId, jwt) => {
    return del(`/v1/jupiter/dishes/${dishId}`,jwt);
}

export {
    createDish,
    listDishesInShop,
    listDishesUnderOwner,
    retrieveDishUnderOwner,
    updateDish,
    deleteDish,
}