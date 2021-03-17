// import {LIST_SHOP} from "./actionTypes";
//
// const initStates = {
//     shopList: []
// }
//
// export default function shopReducer (state = initStates, action){
//     console.log("shopReducer:");
//     console.log(action);
//     switch (action.type) {
//         case LIST_SHOP:{
//             return {
//                 ...state,
//                 shopList: action.payload,
//             }
//         }
//         default: {
//             return state;
//         }
//     }
// }