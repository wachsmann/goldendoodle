import React from 'react';
import { connect } from 'react-redux';
import RegisterView  from './RegisterView';
import { categoriesActions,stocksActions } from '../../_actions';

class Edit extends React.Component {
  constructor(props) {
  
    super(props);
    this.props.dispatch(stocksActions.getAll());
    this.props.dispatch(categoriesActions.getById(props.itemId));
  }
  onSend(obj){
   
    this.props.dispatch(categoriesActions.update(obj));
    this.props.onClose();
  }

  render() {

    const {categories,stocks} = this.props;
    if(categories.category)
      return (
        <div>
         <RegisterView 
            onSend={this.onSend} 
            props={this.props} 
            stocks={stocks.data} 
            title={"Edição de Categoria"}
            category={categories.category} 
            
          />
         
        </div>
      );

    return (<div></div>);
  
  }
}
function mapStateToProps(state) {
    
    const { categories,stocks } = state;
    
    return {
        categories,
        stocks
    };
}

const connectedEdit = connect(mapStateToProps)(Edit);
export { connectedEdit as Edit };
