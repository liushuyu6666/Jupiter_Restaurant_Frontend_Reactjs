import {SET_PROFILE} from "./actionTypes";

const initStates = {
    profile: {
        "username": "",
        "email": "",
        "roles": [],
    }
}

export default function userReducer (state = initStates, action){
    console.log(action);
    switch (action.type) {
        case SET_PROFILE:{
            return {
                profile: {
                    "username": action.payload.username,
                    "email": action.payload.email,
                    "roles": action.payload.roles,
                }
            }
        }
        default: {
            return initStates;
        }
    }
}