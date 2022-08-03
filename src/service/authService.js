import {request} from './requester.js';

const url = 'http://localhost:3030/users';

export const login = (email,password) => {
    return request(`${url}/login`,'POST',{email,password})
        .then(user => {
            saveUser(user);
        }).catch(err => {
            alert(err.message)
    })
}

export const logout = () => {
    return fetch(`${url}/logout`,
        { headers: {'X-Authorization': getUser().accessToken}})
        .then(() => {
        clearStorage();
    }).catch(err => {
        console.log('Error: ', err)
    })
}

export const register = (email, password,context) => {
    request(`${url}/register`, 'POST', {email, password})
        .then(user => {
            saveUser(user);
            context.page.redirect('/')
        }).catch(err => {
        console.log(err)
    })
}

const saveUser = (user) => {
    if (user.accessToken){
        localStorage.setItem('user',JSON.stringify(user));
    }
}

const clearStorage = () => {
    localStorage.clear();
}

export const getUser = () => {
    const serializable = localStorage.getItem('user');
    if (serializable){
        return JSON.parse(serializable);
    }
}