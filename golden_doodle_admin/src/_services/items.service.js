import { authHeader,urlAppender } from '../_helpers';

export const itemsService = {
  
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

    return fetch(urlAppender('/items/all'), requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(urlAppender('/items/' + id), requestOptions).then(handleResponse);
}

function register(item) {
    
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(item)
    };

    return fetch(urlAppender('/items'), requestOptions).then(handleResponse);
}

function update(item) {

    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify({_id:item._id,name:item.name,category:item.categories,unity_measure:item.unities,qtt:item.qtt})
    };

    return fetch(urlAppender('/items/' + item._id), requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(urlAppender('/items/' + id), requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}