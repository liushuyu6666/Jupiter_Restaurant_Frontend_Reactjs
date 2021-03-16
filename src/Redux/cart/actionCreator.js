import {ADD_CART, DELETE_CART, COUNT_ITEMS, RESET_CART} from "./actionTypes";

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

export const resetCart = () => (
    {
        type: RESET_CART,
    }
)

export const countItems = () => (
    {
        type: COUNT_ITEMS,
    }
)
