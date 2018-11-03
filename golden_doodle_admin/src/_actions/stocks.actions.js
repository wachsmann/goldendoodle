import { stocksConstants } from '../_constants';
import { stocksService } from '../_services';
import { history } from '../_helpers';
import { alertActions } from './';

export const stocksActions = {

    register,
    getAll,
    update,
    delete: _delete,
    getById
};




function getById(id) {
    console.log("ID",id);
    return dispatch => {
        dispatch(alertActions.info("Carregando..."));
        dispatch(request(id));

        stocksService.getById(id)
            .then(
                stock => { 
                    dispatch(success(stock));
                    dispatch(alertActions.clear());

                    //history.push('/login');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error("Falha ao buscar item!"));
                    //dispatch(itemsActions.getAll());
                    
                }
            );
    };

    function request(id) { return { type: stocksConstants.GETBYID_REQUEST, id } }
    function success(stock) { return { type: stocksConstants.GETBYID_SUCCESS, stock } }
    function failure(error) { return { type: stocksConstants.GETBYID_FAILURE, error } }
}

function register(stock) {
    return dispatch => {
        dispatch(alertActions.info("Carregando..."));
        dispatch(request(stock));

        stocksService.register(stock)
            .then(
                stock => { 
                    dispatch(success());
                    dispatch(alertActions.success("Cadastrado com sucesso!"));
                    dispatch(stocksActions.getAll());
                },
                error => {
                    dispatch(alertActions.error("Falha ao cadastrar item!"));
                    dispatch(failure(error));
                }
            );
    };

    function request(stock) { return { type: stocksConstants.REGISTER_REQUEST, stock } }
    function success(stock) { return { type: stocksConstants.REGISTER_SUCCESS, stock } }
    function failure(error) { return { type: stocksConstants.REGISTER_FAILURE, error } }
}

function update(stock) {
    return dispatch => {
        dispatch(alertActions.info("Carregando..."));
        dispatch(request(stock));

        stocksService.update(stock)
            .then(
                category => { 
                    dispatch(success());
                    dispatch(alertActions.success("Atualizado com sucesso!"));
                    dispatch(stocksActions.getAll());
                    //history.push('/login');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error("Falha ao atualizar estoque!"));
                    dispatch(stocksActions.getAll());
                    
                }
            );
    };

    function request(stock) { return { type: stocksConstants.UPDATE_REQUEST, stock } }
    function success() { return { type: stocksConstants.UPDATE_SUCCESS} }
    function failure(error) { return { type: stocksConstants.UPDATE_FAILURE, error } }
}

function getAll(req) {
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
        stocksService.getAll(req)
            .then(
                stocks => dispatch(success(stocks)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: stocksConstants.GETALL_REQUEST } }
    function success(stocks) { return { type: stocksConstants.GETALL_SUCCESS, stocks } }
    function failure(error) { return { type: stocksConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        stocksService.delete(id)
            .then(
                stock => { 
                    dispatch(success(id));
                    dispatch(alertActions.success("Excluído com sucesso!"));
                    dispatch(stocksActions.getAll());
                },
                error => {
                    dispatch(failure(id, error));
                    dispatch(alertActions.error("Falha ao deletar item!"));

                }
            );
    };

    function request(id) { return { type: stocksConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: stocksConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: stocksConstants.DELETE_FAILURE, id, error } }
}