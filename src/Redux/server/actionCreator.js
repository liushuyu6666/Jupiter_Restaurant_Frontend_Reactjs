import {LOADED, LOADING, SET_MAIN_CONTENT, SET_SERVER_ERRORS, RESET_SERVER} from "./actionType";

export const loading = () => (
    {
        type: LOADING,
    }
)

export const loaded = () => (
    {
        type: LOADED,
    }
)

export const setServerError = (error) => (
    {
        type: SET_SERVER_ERRORS,
        payload: error,
    }
)

export const setMainContent = (content) => (
    {
        type: SET_MAIN_CONTENT,
        payload: content,
    }
)

export const resetServer = () => (
    {
        type: RESET_SERVER,
    }
)