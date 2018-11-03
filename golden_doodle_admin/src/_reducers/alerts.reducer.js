import { alertConstants } from '../_constants';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'SUCCESS',
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: 'ERROR',
        message: action.message
      };
    case alertConstants.INFO:
      return {
        type: 'INFO',
        message: action.message
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}