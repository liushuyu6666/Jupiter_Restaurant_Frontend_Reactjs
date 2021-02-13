import {composeWithDevTools} from "redux-devtools-extension";
import {createStore, applyMiddleware, compose} from "redux";
import thunkMiddleware from 'redux-thunk';
import rootReducer from "./reducer";

const composedEnhancer = compose(
    applyMiddleware(thunkMiddleware)
)

const store = createStore(
    rootReducer,
    composedEnhancer,
)

export default store;