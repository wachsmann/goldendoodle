import { authHeader,urlAppender } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getList,
    getById,
    update,
    delete: _delete
};

function login(name, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                 
                },
        body: JSON.stringify({ name, password })
    };

    return fetch('http://localhost:8081/auth/login', requestOptions)

        .then(response => {
            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll(req) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(req)
        
    };

    return fetch(urlAppender('/users/all'), requestOptions).then(handleResponse);
}

function getList() {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        
    };

    return fetch(urlAppender('/users/'), requestOptions).then(handleResponse);
}
function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(urlAppender('/users/' + id), requestOptions).then(handleResponse);
}

function register(user) {
    console.log(user);
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(user)
    };

    return fetch(urlAppender('/users'), requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    console.log("USER",user);
    return fetch(urlAppender('/users/' + user._id), requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(urlAppender('/users/' + id), requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}