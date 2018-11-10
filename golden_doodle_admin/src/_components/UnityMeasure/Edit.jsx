import React from 'react';
import { connect } from 'react-redux';
import RegisterView  from './RegisterView';
import { unitiesActions } from '../../_actions';

class Edit extends React.Component {
  constructor(props) {
  
    super(props);
    
    this.props.dispatch(unitiesActions.getById(props.itemId));
  }
  onSend(obj){
   
    this.props.dispatch(unitiesActions.update(obj));
    this.props.onClose();
  }

  render() {

    const {unities} = this.props;
    if(unities.unity)
      return (
        <div>
         <RegisterView 
            onSend={this.onSend} 
            props={this.props} 
            category={unities.unity} 
            title={"Editar Unidade de Medida"}
          />
         
        </div>
      );

    return (<div></div>);
  
  }
}
function mapStateToProps(state) {
    
    const { unities } = state;
    
    return {
        unities,
    };
}

const connectedEdit = connect(mapStateToProps)(Edit);
export { connectedEdit as Edit };
