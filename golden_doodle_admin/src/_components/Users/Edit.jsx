import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RegisterView  from './RegisterView';
import { stocksActions } from '../../_actions';

class Edit extends React.Component {
  constructor(props) {
  
    super(props);
    //Get stocks
    //this.props.dispatch(categoriesActions.getAll());
    
    
    
  }
  onSend(obj){
    //console.log(obj);
    this.props.dispatch(stocksActions.update(obj));
    this.props.onClose();
  }

  render() {

    const {stocks,user} = this.props;
    if(user)
      return (
        <div>
         <RegisterView 
            onSend={this.onSend} 
            props={this.props} 
            stocks={stocks.data}
            user={user} 
            title={"Edição de usuário"}
            //itemName={items.item && items.item.name} 
          />
         
        </div>
      );
  return (<div></div>);
  }
}
function mapStateToProps(state) {
    
    const {stocks,user} = state;
    
    return {
        stocks,
        user,
    };
}

const connectedEdit = connect(mapStateToProps)(Edit);
export { connectedEdit as Edit };
