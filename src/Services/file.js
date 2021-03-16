import {get, post} from "./restClient";


const updateImage = (imageId, imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("name", imageId);
    let jwt = localStorage.getItem("Authorization");

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

const createImage = (imageId, imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("name", imageId);
    let jwt = localStorage.getItem("Authorization");

    return fetch(`/v1/jupiter/files`,{
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
    createImage,
}