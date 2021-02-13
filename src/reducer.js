import { combineReducers} from "redux";
import tokenReducer from './Redux/token/tokenSlice';


const rootReducer = combineReducers({
    token: tokenReducer,
})

export default rootReducer;