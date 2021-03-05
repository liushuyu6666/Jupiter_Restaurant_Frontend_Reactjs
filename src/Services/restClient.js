const post = (url, jwt, body) => {
    return fetch(
        url,
        {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": jwt? "Bearer "
                        + localStorage.getItem("token") : ""
                },
                body: JSON.stringify(body),
            }
    ).then(response => {
        if(response.ok){
            return response.json();
        }
        throw response.json();
    })
}

const get = (url, jwt=false) => {
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": jwt? "Bearer "
                + localStorage.getItem(process.env.REACT_APP_TOKEN) : ""
        },
    }).then(response => {
        if(response.ok){
            return response.json();
        }
        throw response.json();
    });
}

export {post, get}