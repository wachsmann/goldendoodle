import { authHeader } from '../_helpers';

export const stocksService = {
  
    register,
    getAll,
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

    return fetch('http://localhost:8081/app/stocks/all', requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('http://localhost:8081/app/stocks/' + id, requestOptions).then(handleResponse);
}

function register(stock) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(stock)
    };

    return fetch('http://localhost:8081/app/stocks', requestOptions).then(handleResponse);
}

function update(stock) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(stock)
    };

    return fetch('http://localhost:8081/app/stocks/' + stock._id, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };

    return fetch('http://localhost:8081/app/stocks/' + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}