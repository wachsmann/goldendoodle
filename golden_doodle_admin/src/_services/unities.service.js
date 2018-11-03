import { authHeader } from '../_helpers';

export const unitiesService = {
  
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

    return fetch('http://localhost:8081/app/unities/all', requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('http://localhost:8081/app/unities/' + id, requestOptions).then(handleResponse);
}

function register(unity) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(unity)
    };

    return fetch('http://localhost:8081/app/unities', requestOptions).then(handleResponse);
}

function update(unity) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(unity)
    };

    return fetch('http://localhost:8081/app/unities/' + unity._id, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('http://localhost:8081/app/unities/' + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}