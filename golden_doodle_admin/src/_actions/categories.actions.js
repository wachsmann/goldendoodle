import { categoriesConstants } from '../_constants';
import { categoriesService } from '../_services';
import { alertActions } from './';

export const categoriesActions = {

    register,
    getAll,
    getList,
    update,
    delete: _delete,
    getById
};

function getById(id) {
    return dispatch => {
        dispatch(alertActions.info("Carregando..."));
        dispatch(request(id));

        categoriesService.getById(id)
            .then(
                category => { 
                    dispatch(success(category));
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

    function request(id) { return { type: categoriesConstants.GETBYID_REQUEST, id } }
    function success(category) { return { type: categoriesConstants.GETBYID_SUCCESS, category } }
    function failure(error) { return { type: categoriesConstants.GETBYID_FAILURE, error } }
}


function register(category) {
    return dispatch => {
        dispatch(alertActions.info("Carregando..."));
        dispatch(request(category));

        categoriesService.register(category)
            .then(
                category => { 
                    dispatch(success(category));
                    dispatch(alertActions.success("Cadastrado com sucesso!"));
                    dispatch(categoriesActions.getAll());
                },
                error => {
                    dispatch(alertActions.error("Falha ao cadastrar item!"));
                    dispatch(failure(error));
                }
            );
    };

    function request(category) { return { type: categoriesConstants.REGISTER_REQUEST, category } }
    function success(category) { return { type: categoriesConstants.REGISTER_SUCCESS, category } }
    function failure(error) { return { type: categoriesConstants.REGISTER_FAILURE, error } }
}

function update(category) {
    return dispatch => {
        dispatch(alertActions.info("Carregando..."));
        dispatch(request(category));
         console.log("dispatch",category);
        categoriesService.update(category)
            .then(
                category => { 
                    dispatch(success());
                    dispatch(alertActions.success("Atualizado com sucesso!"));
                    dispatch(categoriesActions.getAll());
                    //history.push('/login');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error("Falha ao atualizar categoria!"));
                    dispatch(categoriesActions.getAll());
                    
                }
            );
    };

    function request(category) { return { type: categoriesConstants.UPDATE_REQUEST, category } }
    function success() { return { type: categoriesConstants.UPDATE_SUCCESS} }
    function failure(error) { return { type: categoriesConstants.UPDATE_FAILURE, error } }
}
function getList() {
    return dispatch => {
        dispatch(request());
       
        categoriesService.getList()
            .then(
                categories => dispatch(success(categories)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: categoriesConstants.GETLIST_REQUEST } }
    function success(categories) { return { type: categoriesConstants.GETLIST_SUCCESS, categories } }
    function failure(error) { return { type: categoriesConstants.GETLIST_FAILURE, error } }
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

        categoriesService.getAll(req)
            .then(
                categories => dispatch(success(categories)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: categoriesConstants.GETALL_REQUEST } }
    function success(categories) { return { type: categoriesConstants.GETALL_SUCCESS, categories } }
    function failure(error) { return { type: categoriesConstants.GETALL_FAILURE, error } }
}


// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        categoriesService.delete(id)
            .then(
                category => { 
                    dispatch(success(id));
                    dispatch(alertActions.success("Excluído com sucesso!"));
                    dispatch(categoriesActions.getAll());
                },
                error => {
                    dispatch(failure(id, error));
                    dispatch(alertActions.error("Falha ao deletar item!"));
                }
            );
    };

    function request(id) { return { type: categoriesConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: categoriesConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: categoriesConstants.DELETE_FAILURE, id, error } }
}