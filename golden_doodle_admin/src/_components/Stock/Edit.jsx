import React from 'react';
import { connect } from 'react-redux';
import RegisterView  from './RegisterView';
import { stocksActions } from '../../_actions';

class Edit extends React.Component {
  constructor(props) {
  
    super(props);
    
    this.props.dispatch(stocksActions.getById(props.itemId));
  }
  onSend(obj){
   
    this.props.dispatch(stocksActions.update(obj));
    this.props.onClose();
  }
  onClose(){
    this.props.onClose();
  }
  render() {

    const {stocks} = this.props;
    if(stocks.stock)
      return (
        <div>
         <RegisterView 
            onSend={this.onSend} 
            onClose={this.onClose} 
            props={this.props} 
            stock={stocks.stock} 
            title={"Editar Estoque"}
          />
         
        </div>
      );

    return (<div></div>);
  
  }
}
function mapStateToProps(state) {
    
    const { stocks } = state;
    
    return {
        stocks,
    };
}

const connectedEdit = connect(mapStateToProps)(Edit);
export { connectedEdit as Edit };
