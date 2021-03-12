const post = (url, jwt, body, isStringify=true) => {
    return fetch(
        url,
        {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": jwt? "Bearer "
                        + jwt: "",
                },
                body: (isStringify)?JSON.stringify(body):body,
            }
    ).then(response => {
        if(response.ok){
            return response.json();
        }
        throw response.json();
    })
}

const get = (url, jwt=null) => {
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": jwt !== null? "Bearer "
                + jwt : ""
        },
    }).then(response => {
        if(response.ok){
            return response.json();
        }
        throw response.json();
    });
}

export {post, get}