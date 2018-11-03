import { unitiesConstants } from '../_constants';

export function unities(state = {}, action) {
  switch (action.type) {

    case unitiesConstants.REGISTER_REQUEST:
      return { registering: true };
    
    case unitiesConstants.REGISTER_SUCCESS:
      return {};
    
    case unitiesConstants.REGISTER_FAILURE:
      return {};    

    case unitiesConstants.UPDATE_REQUEST:
      return {
        updating: true,
        unities:state.unities
      };
    
    case unitiesConstants.UPDATE_SUCCESS:
      return {unities:state.unities};
    
    case unitiesConstants.UPDATE_FAILURE:
      return {error: action.error};  

    case unitiesConstants.GETBYID_REQUEST:
      return {
        loading: true,
        data:state.data
      };
    
    case unitiesConstants.GETBYID_SUCCESS:

      return {
        unity: action.unity,
        data:state.data
      };
    case unitiesConstants.GETBYID_FAILURE:
      return { 
        error: action.error,
        data:state.data
      };      
    
    case unitiesConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    
    case unitiesConstants.GETALL_SUCCESS:
      return {
        table: action.unities
      };
    case unitiesConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case unitiesConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        unities: state.unities && state.unities.map(unity =>
          unity.id === action.id
            ? { ...unity, deleting: true }
            : unity
        )
      };
    case unitiesConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        unities: state.unities && state.unities.filter(unity => unity.id !== action.id)
      };
    case unitiesConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        unities: state.unities && state.unities.map(unity => {
          if (unity.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...unityCopy } = unity;
            // return copy of user with 'deleteError:[error]' property
            return { ...unityCopy, deleteError: action.error };
          }

          return unity;
        })
      };
    default:
      return state
  }
}