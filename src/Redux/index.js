import {createStore, combineReducers} from "redux";
import userReducer from "./user/reducer";
import shopReducer from "./shop/reducer";

// persist profile while refresh the web page
const saveToLocalStorage = state => {
    console.log("saveToLocalStorage");
    try{
        const reduxState = JSON.stringify(state); // ? state.user
        localStorage.setItem("reduxState", reduxState);
    } catch (e){
        console.log(e);
    }
}

function loadFromLocalStorage() {
    try{
        const serializedState = localStorage.getItem("reduxState");
        if(serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e){
        console.log(e);
        return undefined;
    }
}

const rootReducer = combineReducers({
    user: userReducer,
    shop: shopReducer,
})

const persistedState = loadFromLocalStorage();

const store = createStore(
    rootReducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;