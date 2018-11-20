import { authHeader,urlAppender } from '../_helpers';

export const stocksService = {
  
    register,
    getAll,
    getList,
    getById,
    update,
    delete: _delete
};


function getAll(req) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(req)
    };

    return fetch(urlAppender('/stocks/all'), requestOptions).then(handleResponse);
}


function getList() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(urlAppender('/stocks/'), requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(urlAppender('/stocks/' + id), requestOptions).then(handleResponse);
}

function register(stock) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(stock)
    };

    return fetch(urlAppender('/stocks'), requestOptions).then(handleResponse);
}

function update(stock) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(stock)
    };

    return fetch(urlAppender('/stocks/' + stock._id), requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };

    return fetch(urlAppender('/stocks/' + id), requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}