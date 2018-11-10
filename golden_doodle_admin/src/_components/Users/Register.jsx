import React from 'react';
import { connect } from 'react-redux';
import RegisterView  from './RegisterView';
import { userActions,stocksActions } from '../../_actions';

class Register extends React.Component {
  constructor(props) {
  
    super(props);
    
    this.props.dispatch(stocksActions.getAll());

  }
  onSend(obj){
    //console.log(obj);
    this.props.dispatch(userActions.register(obj));
    this.props.onClose();
  }

  render() {

    const {stocks} = this.props;
    
    return (
      <div>
        <RegisterView 
          onSend={this.onSend} 
          props={this.props} 
          stocks={stocks.data}
          title={"Novo Usuário"}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
    
    const { stocks } = state;
    
    return {
       stocks
    };
}

const connectedRegister = connect(mapStateToProps)(Register);
export { connectedRegister as Register };
