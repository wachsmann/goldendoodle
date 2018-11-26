import React from 'react';
import { connect } from 'react-redux';
import RegisterView  from './RegisterView';
import {categoriesActions,stocksActions } from '../../_actions';

class Register extends React.Component {
  constructor(props) {
  
    super(props);
    
    this.props.dispatch(stocksActions.getAll());
    

  }
  onSend(obj){
    //console.log(obj);
    this.props.dispatch(categoriesActions.register(obj));
    this.props.onClose();
  }
  onClose(){
    //console.log(obj);
    this.props.onClose();
  }
  render() {

    const {categories,stocks} = this.props;

    return (
      <div>
        <RegisterView 
          onSend={this.onSend} 
          onClose={this.onClose} 
          props={this.props} 
          categories={categories.data} 
          stocks={stocks.data} 
          title={"Nova Categoria"}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
    
    const { categories,stocks } = state;
    
    return {
        categories,
        stocks
       
    };
}

const connectedRegister = connect(mapStateToProps)(Register);
export { connectedRegister as Register };
