import { itemsConstants } from '../_constants';
import { itemsService } from '../_services';
import { history } from '../_helpers';
import { alertActions } from './';

export const itemsActions = {

    register,
    update,
    getAll,
    getById,
    delete: _delete
};


function getById(id) {
    return dispatch => {
        dispatch(alertActions.info("Carregando..."));
        dispatch(request(id));

        itemsService.getById(id)
            .then(
                item => { 
                    dispatch(success(item));
                    dispatch(alertActions.clear());

                    //history.push('/login');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error("Falha ao buscar item!"));
                    dispatch(itemsActions.getAll());
                    
                }
            );
    };

    function request(id) { return { type: itemsConstants.GETBYID_REQUEST, id } }
    function success(item) { return { type: itemsConstants.GETBYID_SUCCESS, item } }
    function failure(error) { return { type: itemsConstants.GETBYID_FAILURE, error } }
}

function register(item) {
    return dispatch => {
        dispatch(alertActions.info("Carregando..."));
        dispatch(request(item));

        itemsService.register(item)
            .then(
                item => { 
                    dispatch(success());
                    dispatch(alertActions.success("Cadastrado com sucesso!"));
                    dispatch(itemsActions.getAll());
                    //history.push('/login');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error("Falha ao cadastrar item!"));
                    dispatch(itemsActions.getAll());
                    
                }
            );
    };

    function request(item) { return { type: itemsConstants.REGISTER_REQUEST, item } }
    function success(item) { return { type: itemsConstants.REGISTER_SUCCESS, item } }
    function failure(error) { return { type: itemsConstants.REGISTER_FAILURE, error } }
}
function update(item) {
    return dispatch => {
        dispatch(alertActions.info("Carregando..."));
        dispatch(request(item));

        itemsService.update(item)
            .then(
                item => { 
                    dispatch(success());
                    dispatch(alertActions.success("Atualizado com sucesso!"));
                    dispatch(itemsActions.getAll());
                    //history.push('/login');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error("Falha ao atualizar item!"));
                    dispatch(itemsActions.getAll());
                    
                }
            );
    };

    function request(item) { return { type: itemsConstants.UPDATE_REQUEST, item } }
    function success() { return { type: itemsConstants.UPDATE_SUCCESS} }
    function failure(error) { return { type: itemsConstants.UPDATE_FAILURE, error } }
}

function getAll(req,page) {
    
    return dispatch => {
        dispatch(request());
        if(!req)
            req = {
                    filters:[],
                    order: 'asc',
                    orderBy: null,
                    selected: [],
                    page: 0,
                    rowsPerPage: 5,
                    totalRows:0
                };
        if(page)
            req.page = page;
        
        itemsService.getAll(req)
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: itemsConstants.GETALL_REQUEST } }
    function success(items) { return { type: itemsConstants.GETALL_SUCCESS, items } }
    function failure(error) { return { type: itemsConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        itemsService.delete(id)
            .then(
                item => { 
                    dispatch(success(id));
                    dispatch(alertActions.success("Exclusão com sucesso!"));
                    dispatch(getAll());
                },
                error => {
                    dispatch(failure(id, error));
                    dispatch(alertActions.error("Falha ao deletar item!"));
                }
            );
    };

    function request(id) { return { type: itemsConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: itemsConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: itemsConstants.DELETE_FAILURE, id, error } }
}