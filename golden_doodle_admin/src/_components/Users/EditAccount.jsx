import React from 'react';
import { connect } from 'react-redux';
import EditView  from './EditView';
import { userActions,stocksActions } from '../../_actions';


class EditAccount extends React.Component {
  constructor(props) {
  
    super(props);
    
    this.props.dispatch(stocksActions.getAll());

    
  }
  onSend(obj){
  this.props.dispatch(userActions.update(
    {
        _id:obj._id,
        name: obj.name,
        password: obj.password,
        stocks:obj.stocks,
        
    }
  ));
      
  }

  render() {

  const {stocks} = this.props;
    
      return (
        <div>
          <EditView 
            onSend={this.onSend}
            props={this.props}
            stocks={stocks.data}
            title={"Conta"}

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

const connectedEditAccount = connect(mapStateToProps)(EditAccount);
export { connectedEditAccount as EditAccount };
