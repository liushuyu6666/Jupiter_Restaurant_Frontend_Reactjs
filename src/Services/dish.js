import {get, post} from "./restClient";


const listDishesInShop = (shopId) => {
    return get(`/v1/jupiter/shops/${shopId}/dishes`, null);
}

export {
    listDishesInShop,
}