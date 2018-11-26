import React from 'react';
import { connect } from 'react-redux';
import RegisterView  from './RegisterView';
import { unitiesActions,categoriesActions,itemsActions } from '../../_actions';

class Register extends React.Component {
  constructor(props) {
  
    super(props);
    
    this.props.dispatch(categoriesActions.getList());
    this.props.dispatch(unitiesActions.getList());

  }
  onSend(obj){
    //console.log(obj);
    this.props.dispatch(itemsActions.register(obj));
    this.props.onClose();
  }
  onClose(){
    //console.log(obj);
    
    this.props.onClose();
  }
  render() {

    const {categories,unities} = this.props;
    
    return (
      <div>
        <RegisterView 
          onSend={this.onSend} 
          onClose={this.onClose} 
          props={this.props} 
          categories={categories.list} 
          unities={unities.list}
          title={"Novo Item"} 
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
    
    const { categories,unities,items } = state;
    
    return {
        categories,
        unities,
        items
    };
}

const connectedRegister = connect(mapStateToProps)(Register);
export { connectedRegister as Register };
