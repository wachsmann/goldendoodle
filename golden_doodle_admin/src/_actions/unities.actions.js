import { unitiesConstants } from '../_constants';
import { unitiesService } from '../_services';
import { alertActions } from './';

export const unitiesActions = {

    register,
    getAll,
    update,
    delete: _delete,
    getById
};




function getById(id) {
    return dispatch => {
        dispatch(alertActions.info("Carregando..."));
        dispatch(request(id));

        unitiesService.getById(id)
            .then(
                unity => { 
                    dispatch(success(unity));
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

    function request(id) { return { type: unitiesConstants.GETBYID_REQUEST, id } }
    function success(unity) { return { type: unitiesConstants.GETBYID_SUCCESS, unity } }
    function failure(error) { return { type: unitiesConstants.GETBYID_FAILURE, error } }
}

function register(unity) {
    return dispatch => {
        dispatch(alertActions.info("Carregando..."));
        dispatch(request(unity));

        unitiesService.register(unity)
            .then(
                unity => { 
                    dispatch(success(unity));
                    dispatch(alertActions.success("Cadastrado com sucesso!"));
                    dispatch(unitiesActions.getAll());
                },
                error => {
                    dispatch(alertActions.error("Falha ao cadastrar item!"));
                    dispatch(failure(error));
                }
            );
    };

    function request(unity) { return { type: unitiesConstants.REGISTER_REQUEST, unity } }
    function success(unity) { return { type: unitiesConstants.REGISTER_SUCCESS, unity } }
    function failure(error) { return { type: unitiesConstants.REGISTER_FAILURE, error } }
}

function update(unity) {
    return dispatch => {
        dispatch(alertActions.info("Carregando..."));
        dispatch(request(unity));

        unitiesService.update(unity)
            .then(
                category => { 
                    dispatch(success());
                    dispatch(alertActions.success("Atualizado com sucesso!"));
                    dispatch(unitiesActions.getAll());
                    //history.push('/login');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error("Falha ao atualizar categoria!"));
                    dispatch(unitiesActions.getAll());
                    
                }
            );
    };

    function request(unity) { return { type: unitiesConstants.UPDATE_REQUEST, unity } }
    function success() { return { type: unitiesConstants.UPDATE_SUCCESS} }
    function failure(error) { return { type: unitiesConstants.UPDATE_FAILURE, error } }
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
        unitiesService.getAll(req)
            .then(
                unities => dispatch(success(unities)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: unitiesConstants.GETALL_REQUEST } }
    function success(unities) { return { type: unitiesConstants.GETALL_SUCCESS, unities } }
    function failure(error) { return { type: unitiesConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        unitiesService.delete(id)
            .then(
                unity => { 
                    dispatch(success(id));
                    dispatch(alertActions.success("Excluído com sucesso!"));
                    dispatch(unitiesActions.getAll());
                },
                error => {
                    dispatch(failure(id, error));
                    dispatch(alertActions.error("Falha ao deletar item!"));

                }
            );
    };

    function request(id) { return { type: unitiesConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: unitiesConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: unitiesConstants.DELETE_FAILURE, id, error } }
}