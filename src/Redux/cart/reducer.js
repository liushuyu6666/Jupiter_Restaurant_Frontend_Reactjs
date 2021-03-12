import {ADD_CART, DELETE_CART} from "./actionTypes";

const initStates = {
    cartItems: [],
}

export default function cartReducer (state = initStates, action){
    // console.log("cartReducer:");
    // console.log(action);
    switch (action.type) {
        case ADD_CART: {
            let newDishId = action.payload.dishId;
            let updatedCartItems = [];
            let existed = false;
            state.cartItems.map((item) => {
                if(item.dishId === newDishId){
                    existed = true;
                    updatedCartItems.push({
                        "dishId": item.dishId,
                        "shopId": item.shopId,
                        "dishName": item.dishName,
                        "shopName": item.shopName,
                        "amount": item.amount + 1,
                    })
                }
                else{
                    updatedCartItems.push(item);
                }
            });
            if(existed){
                return {
                    ...state,
                    cartItems: updatedCartItems,
                }
            }
            else{
                let newItem = {
                    "dishId": action.payload.dishId,
                    "shopId": action.payload.shopId,
                    "dishName": action.payload.dishName,
                    "shopName": action.payload.shopName,
                    "amount": 1,
                }
                return{
                    ...state,
                    cartItems:[
                        ...state.cartItems,
                        newItem,
                    ]
                }
            }

        }
        default:{
            return state;
        }
    }
}