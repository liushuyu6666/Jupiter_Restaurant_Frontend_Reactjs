import store from "../Redux";
import {loaded, loading, setServerError, setMainContent, resetServer} from "../Redux/server/actionCreator";

// responseFromServer: Promise
export const loadPage = (responseFromServer) => {

    const state = store.getState();
    const dispatch = store.dispatch;

    dispatch(loading());
    responseFromServer
        .then(res => {
            if(res.result != null){
                dispatch(setMainContent(res.result));
                dispatch(loaded());
                dispatch(setServerError({
                    isValid: true,
                    message: res.msg,
                }));
            }
            else{
                dispatch(loaded());
                dispatch(setServerError({
                    isValid: false,
                    message: res.msg,
                }));
            }
        })
        .catch(res => {
            dispatch(loaded());
            dispatch(setServerError({
                isValid: false,
                message: res.msg,
            }));
        })
}
