import { categoriesConstants } from '../_constants';

export function categories(state = {}, action) {
  switch (action.type) {

    case categoriesConstants.REGISTER_REQUEST:
      return { registering: true };
    
    case categoriesConstants.REGISTER_SUCCESS:
      return {};
    
    case categoriesConstants.REGISTER_FAILURE:
      return {};    
    
    case categoriesConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case categoriesConstants.UPDATE_REQUEST:
      return {
        updating: true,
        categories:state.categories
      };
    
    case categoriesConstants.UPDATE_SUCCESS:
      return {categories:state.items};
    
    case categoriesConstants.UPDATE_FAILURE:
      return {error: action.error};  

    case categoriesConstants.GETBYID_REQUEST:
      return {
        loading: true,
        table:state.table
      };
    
    case categoriesConstants.GETBYID_SUCCESS:

      return {
        category: action.category,
        table:state.table
      };
    case categoriesConstants.GETBYID_FAILURE:
      return { 
        error: action.error,
        data:state.data
      };

    case categoriesConstants.GETALL_SUCCESS:
    
      return {
        table: action.categories
      };
    case categoriesConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case categoriesConstants.GETLIST_SUCCESS:
    
      return {
        list: action.categories
      };
    case categoriesConstants.GETLIST_FAILURE:
      return { 
        error: action.error
      };     
    case categoriesConstants.GETLIST_REQUEST:
      return {
        loading: true
      };       
      case categoriesConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        categories: state.categories && state.categories.map(item =>
          item.id === action.id
            ? { ...item, deleting: true }
            : item
        )
      };
    case categoriesConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        data: state.categories && state.categories.data.filter(category => category.id !== action.id)
      };
    case categoriesConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        data: state.categories && state.categories.data.map(category => {
          if (category.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...categoryCopy } = category;
            // return copy of user with 'deleteError:[error]' property
            return { ...categoryCopy, deleteError: action.error };
          }

          return category;
        })
      };
    default:
      return state
  }
}