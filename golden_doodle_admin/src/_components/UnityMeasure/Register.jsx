import React from 'react';
import { connect } from 'react-redux';
import RegisterView  from './RegisterView';
import {unitiesActions } from '../../_actions';

class Register extends React.Component {

  onSend(obj){
    //console.log(obj);
    this.props.dispatch(unitiesActions.register(obj));
    this.props.onClose();
  }
  onClose(){
    this.props.onClose();
  }
  render() {

    

    return (
      <div>
        <RegisterView 
          onSend={this.onSend} 
          onClose={this.onClose} 
          props={this.props} 
          title={"Nova Unidade de Medida"}
        />
      </div>
    );
  }
}

const connectedRegister = connect()(Register);
export { connectedRegister as Register };
