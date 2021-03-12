import {createStore, combineReducers} from "redux";
import userReducer from "./user/reducer";
import shopReducer from "./shop/reducer";
import cartReducer from "./cart/reducer";
import serverReducer from "./server/reducer";

// persist profile while refresh the web page
const saveToLocalStorage = state => {
    console.log("saveToLocalStorage");
    console.log(state);
    try{
        const reduxState = JSON.stringify(state.user); // ? state.user
        localStorage.setItem("reduxState", reduxState);
    } catch (e){
        console.log(e);
    }
}

const persistedState = () => {
    try{
        const serializedState = localStorage.getItem("reduxState");
        if(serializedState === null) return undefined;
        let persistedValue = JSON.parse(serializedState);
        return {user: persistedValue};
    } catch (e){
        console.log(e);
        return undefined;
    }
}

const rootReducer = combineReducers({
    user: userReducer,
    // shop: shopReducer,
    cart: cartReducer,
    server: serverReducer,
})

// const persistedState = loadFromLocalStorage();

const store = createStore(
    rootReducer,
    persistedState(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;