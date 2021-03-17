import {post} from "./restClient";

const register = (username, email, password, roles) => {
    let body= {
        "username": username,
        "email": email,
        "password": password,
        "roles": roles,
    }
    return post("/v1/jupiter/register",null, body)
}

const login = (username, password) => {
    let loginRequest = {
        "username": username,
        "password": password,
    };
    return post("/v1/jupiter/login", null, loginRequest);
}

const verify = (jwt) => {
    return post("/v1/jupiter/verify", jwt, null);
}

export {
    register,
    login,
    verify
}