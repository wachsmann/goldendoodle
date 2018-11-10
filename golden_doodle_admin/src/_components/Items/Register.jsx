import React from 'react';
import { connect } from 'react-redux';
import RegisterView  from './RegisterView';
import { unitiesActions,categoriesActions,itemsActions } from '../../_actions';

class Register extends React.Component {
  constructor(props) {
  
    super(props);
    
    this.props.dispatch(categoriesActions.getAll());
    this.props.dispatch(unitiesActions.getAll());

  }
  onSend(obj){
    //console.log(obj);
    this.props.dispatch(itemsActions.register(obj));
    this.props.onClose();
  }

  render() {

    const {categories,unities} = this.props;

    return (
      <div>
        <RegisterView 
          onSend={this.onSend} 
          props={this.props} 
          categories={categories.data} 
          unities={unities.data}
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
