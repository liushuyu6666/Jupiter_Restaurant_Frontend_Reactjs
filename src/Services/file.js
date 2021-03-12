import {get, post} from "./restClient";


const updateImage = (imageId, jwt, formData) => {
    return fetch(`/v1/jupiter/files/${imageId}`,{
        "method": "POST",
        "headers": {
            "Authorization": `Bearer ${jwt}`,
        },
        "body": formData,
        "redirect": "follow",
    })
        .then(res => res.json())
}

export {
    updateImage,
}