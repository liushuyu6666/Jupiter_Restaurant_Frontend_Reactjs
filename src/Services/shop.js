import {get} from "./restClient";

const listShop = () => {
    return get("/v1/jupiter/shops");
}

export {listShop}