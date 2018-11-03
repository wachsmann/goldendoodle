import { alertConstants } from '../_constants';

export const alertActions = {
    success,
    error,
    clear,
    info
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}
function info(message) {
    return { type: alertConstants.INFO, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}