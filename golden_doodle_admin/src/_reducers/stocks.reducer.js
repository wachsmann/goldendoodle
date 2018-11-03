import { stocksConstants } from '../_constants';

export function stocks(state = {}, action) {
  switch (action.type) {

    case stocksConstants.REGISTER_REQUEST:
      return { registering: true };
    
    case stocksConstants.REGISTER_SUCCESS:
      return {};
    
    case stocksConstants.REGISTER_FAILURE:
      return {};    
    case stocksConstants.UPDATE_REQUEST:
      return {
        updating: true,
        stocks:state.stocks
      };
    
    case stocksConstants.UPDATE_SUCCESS:
      return {stocks:state.stocks};
    
    case stocksConstants.UPDATE_FAILURE:
      return {error: action.error};  

    case stocksConstants.GETBYID_REQUEST:
      return {
        loading: true,
        data:state.data
      };
    
    case stocksConstants.GETBYID_SUCCESS:

      return {
        stock: action.stock,
        data:state.data
      };
    case stocksConstants.GETBYID_FAILURE:
      return { 
        error: action.error,
        data:state.data
      }; 
    case stocksConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    
    case stocksConstants.GETALL_SUCCESS:
      return {
        table: action.stocks
      };
    case stocksConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case stocksConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        stocks: state.stocks.map(stock =>
          stock.id === action.id
            ? { ...stock, deleting: true }
            : stock
        )
      };
    case stocksConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        stocks: state.stocks.filter(stock => stock.id !== action.id)
      };
    case stocksConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        stocks: state.stocks.map(stock => {
          if (stock.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...stockCopy } = stock;
            // return copy of user with 'deleteError:[error]' property
            return { ...stockCopy, deleteError: action.error };
          }

          return stock;
        })
      };
    default:
      return state
  }
}