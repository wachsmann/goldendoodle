import React from 'react';
import { connect } from 'react-redux';
import RegisterView  from './RegisterView';
import { unitiesActions,categoriesActions,itemsActions } from '../../_actions';

class Edit extends React.Component {
  constructor(props) {
  
    super(props);
    
    this.props.dispatch(categoriesActions.getList());
    this.props.dispatch(unitiesActions.getList());
    this.props.dispatch(itemsActions.getById(this.props.itemId));
    
  }
  onSend(obj){
    //console.log(obj);
    this.props.dispatch(itemsActions.update(obj));
    this.props.onClose();
  }

  render() {

    const {categories,unities,items} = this.props;
    if(items.item)
      return (
        <div>
         <RegisterView 
            onSend={this.onSend} 
            props={this.props} 
            categories={categories.list} 
            unities={unities.list}
            item={items.item} 
            itemName={items.item && items.item.name} 
            title={"Editar Item"}
          />
         
        </div>
      );
  return (<div></div>);
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

const connectedEdit = connect(mapStateToProps)(Edit);
export { connectedEdit as Edit };
