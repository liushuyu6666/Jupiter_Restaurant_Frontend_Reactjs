import {ADD_CART, COUNT_ITEMS, DELETE_CART, RESET_CART} from "./actionTypes";

const initStates = {
    cartItems: [],
    total: 0,
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
                        "imgUrl": action.payload.imgUrl,
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
                    "imgUrl": action.payload.imgUrl,
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
        case DELETE_CART:{
            let targetDishId = action.payload.dishId;
            let updatedCartItems = [];
            state.cartItems.map((item) => {
                if(item.dishId === targetDishId){
                    if(item.amount > 1){
                        updatedCartItems.push({
                            "dishId": item.dishId,
                            "shopId": item.shopId,
                            "dishName": item.dishName,
                            "shopName": item.shopName,
                            "imgUrl": action.payload.imgUrl,
                            "amount": item.amount - 1,
                        })
                    }
                }
                else{
                    updatedCartItems.push(item);
                }
            });
            return {
                ...state,
                cartItems: updatedCartItems,
            }
        }
        case COUNT_ITEMS:{
            let total = 0;
            state.cartItems.map(item => {
                total += item.amount;
            })
            return {
                ...state,
                total: total,
            }
        }
        case RESET_CART: {
            return {
                ...state,
                cartItems: [],
                total: 0,
            }
        }
        default:{
            return state;
        }
    }
}