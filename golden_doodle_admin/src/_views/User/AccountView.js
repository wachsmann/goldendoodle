import React from 'react';
import { connect } from 'react-redux';
import {EditAccount} from '../../_components/Users';

class AccountView extends React.Component {
    
    handleCloseRegister = () => {
        this.setState({ openRegister: false });
    }
    handleCloseEdit = () => {
        this.setState({ openEdit: false });
    }
    handleCloseDelete = () => {
        this.setState({ openDelete: false });
    }    
    handleConfirmDelete = () =>{
        this.setState({"openDelete":false});
        console.log("Delete",this.state.itemId);
        //this.props.dispatch(itemsActions.delete(this.state.itemId));
        
    }

    render() {

        return (
            <div>
               
              <EditAccount/>
             
                            
            </div>
        );
    }
}

function mapStateToProps(state) {
    
    const { authentication,users } = state;
    console.log(users);
    return {
        authentication,
        users
    };
}

const connectedAccountView = connect(mapStateToProps)(AccountView);
export { connectedAccountView as AccountView };