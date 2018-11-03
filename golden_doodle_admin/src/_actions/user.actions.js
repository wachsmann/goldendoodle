import { userConstants } from '../_constants';
import { userService } from '../_services';
import { history } from '../_helpers';
import { alertActions } from './';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    update
    //delete: _delete
};

function login(username, password) {
    return dispatch => {
         dispatch(alertActions.info("Carregando..."));
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error("Usuário e senha inválidos"));

                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    dispatch(alertActions.success("Cadastrado com sucesso!"));
                    dispatch(userActions.getAll());

                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error("Falha ao cadastrar item!"));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function update(obj) {
    return dispatch => {
        dispatch(alertActions.info("Carregando..."));
        dispatch(request(obj));
        
        userService.update(obj)
            .then(
                obj => { 
                    dispatch(success());
                    dispatch(alertActions.success("Atualizado com sucesso!"));
                    dispatch(userActions.getAll());
                    //history.push('/login');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error("Falha ao atualizar conta!"));
                    dispatch(userActions.getAll());
                    
                }
            );
    };

    function request(user) { return { type: userConstants.UPDATE_REQUEST, user } }
    function success() { return { type: userConstants.UPDATE_SUCCESS} }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
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
                };

        userService.getAll(req)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

