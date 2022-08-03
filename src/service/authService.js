import {request} from './requester.js';

const url = 'http://localhost:3030';

export const login = (email,password) => {
    return request(`${url}/users/login`,'POST',{email,password})
        .then(user => {
            saveUser(user);
        }).catch(err => {
            alert(err.message)
    })
}

export const logout = (context) => {
    request(`${url}/users/logout`).then(res => {
        console.log(res)
        clearStorage();
        context.page.redirect('/');
        return res.json();
    }).catch(err => {
        console.log(err)
    })
}

export const register = (email, password,context) => {
    request(`${url}/users/register`, 'POST', {email, password})
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