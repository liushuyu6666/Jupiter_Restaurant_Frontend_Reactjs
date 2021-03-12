import {get, post} from "./restClient";

const listShop = () => {
    return get("/v1/jupiter/shops");
}

const retrieveShop = (shopId) => {
    return get(`/v1/jupiter/shops/${shopId}`, null);
}

const listShopUnderOwner = (jwt) => {
    return get(`/v1/jupiter/manage/shops`, jwt);
}

const updateShop = (shopId, jwt, body) => {
    return post(`/v1/jupiter/shops/${shopId}`, jwt, body);
}

export {
    listShop,
    retrieveShop,
    listShopUnderOwner,
    updateShop,
}