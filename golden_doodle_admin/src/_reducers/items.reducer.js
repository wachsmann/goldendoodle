import { itemsConstants } from '../_constants';

export function items(state = {}, action) {
  switch (action.type) {

    case itemsConstants.REGISTER_REQUEST:
      return { registering: true};
    
    case itemsConstants.REGISTER_SUCCESS:
      return {registered:true};
    
    case itemsConstants.REGISTER_FAILURE:
      return {};    
    
    case itemsConstants.UPDATE_REQUEST:
      return {
        updating: true,
        items:state.items
      };
    
    case itemsConstants.UPDATE_SUCCESS:
      return {items:state.items};
    
    case itemsConstants.UPDATE_FAILURE:
      return {error: action.error};  

    case itemsConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    
    case itemsConstants.GETALL_SUCCESS:
      return {
        table: action.items
      };
    case itemsConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };

    case itemsConstants.GETBYID_REQUEST:
    
      return {
        loading: true,
        data:state.data,
        table:state.table
      };
    
    case itemsConstants.GETBYID_SUCCESS:
      return {
        item: action.item,
        table:state.table
      };
    case itemsConstants.GETBYID_FAILURE:
      return { 
        error: action.error,
        data:state.data
      };

    case itemsConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items && state.items.map(item =>
          item.id === action.id
            ? { ...item, deleting: true }
            : item
        )
      };
    case itemsConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items && state.items.filter(item => item.id !== action.id)
      };
    case itemsConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items && state.items.map(item => {
          if (item.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...itemCopy } = item;
            // return copy of user with 'deleteError:[error]' property
            return { ...itemCopy, deleteError: action.error };
          }

          return item;
        })
      };
    default:
      return state
  }
}