import {getUser} from "./authService.js";

const url = 'http://localhost:3030/data/albums'
export const getAll = async () => {
    const response = await fetch(`${url}?sortBy=_createdOn%20desc&distinct=name`)
    return processRequest(response);
}

export const search = async (name) => {
    const query = encodeURIComponent(`name LIKE "${name}"`);
    const res = await fetch(`${url}?where=${query}`);
    return processRequest(res);
}

export const getAlbumById = async (id) => {
    const response = await fetch(`${url}/${id}`,{
        headers: {'X-Authorization': getUser().accessToken}
    });
    return processRequest(response);
}

export const create = async (data) => {
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-type': 'Application/json',
            'X-Authorization': getUser().accessToken
        },
        body: JSON.stringify(data)
    })
    return processRequest(response);
}

export const edit = async (data,id) => {
    const response = await fetch(`${url}/${id}`,{
        method: 'PUT',
        headers: {
            'Content-type': 'Application/json',
            'X-Authorization': getUser().accessToken
        },
        body: JSON.stringify(data)
    })
    return processRequest(response);
}

export const del = async (id) => {
    const res = await fetch(`${url}/${id}`,{
        method: 'DELETE',
        headers: {
            'X-Authorization': getUser().accessToken
        }
    })
    return  processRequest(res);
}

const processRequest = async (response) => {
    const result = await response.json();

    if (response.ok){
        return result;
    }else {
        throw result;
    }

}