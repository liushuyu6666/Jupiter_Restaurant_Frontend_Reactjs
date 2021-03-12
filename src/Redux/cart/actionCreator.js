import {ADD_CART, DELETE_CART} from "./actionTypes";

export const addItemInCart = cartItem => (
    {
        type: ADD_CART,
        payload: cartItem,
    }
)

export const deleteItemFromCart = (dishId) => (
    {
        type: DELETE_CART,
        payload: dishId,
    }
)