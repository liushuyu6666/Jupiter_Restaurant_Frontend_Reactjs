import store from '../../store';

const initialState = {
    isCertified: false,
    username: "",
    email: "",
    role: "",
    error: "",
}

export default function tokenReducer(state = initialState, action){
    switch (action.type){
        case 'token/verifyTokenSuccessfully': {
            return {
                isCertified: true,
                username: action.payload.username,
                email: action.payload.email,
                role: action.payload.role,
                error: "",
            }
        }
        case 'token/verifyTokenFail': {
            return {
                isCertified: false,
                username: "",
                email: "",
                role: "",
                error: action.payload,
            }
        }
        case 'token/noToken': {
            return {
                isCertified: false,
                username: "",
                email: "",
                role: "",
                error: "please login first",
            }
        }
        default:
            return state;
    }
}

export const loginSuccessful = (dataResult) => ({
    type: 'token/verifyTokenSuccessfully',
    payload: dataResult,
})

export const loginFail = (dataMessage) => ({
    type: 'token/verifyTokenFail',
    payload: dataMessage,
})

export const noToken = () => ({
    type: 'token/noToken',
})

export const checkTokenAndFillProfile = () => {
    let token = localStorage.getItem("token");
    if(!token) store.dispatch(noToken());
    else {
        fetch("/v1/profile", {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "token": token,
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.result != null){
                store.dispatch(loginSuccessful(data.result))
            }
            else{
                store.dispatch(loginFail(data.msg))
            }
        })
        .catch(error => store.dispatch(loginFail(error.toString())))
    }
}