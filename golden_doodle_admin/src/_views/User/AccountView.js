import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';
import {Button,Modal,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions} from '@material-ui/core';

import {EditAccount} from '../../_components/Users';

class AccountView extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
           
        };
    
    }

    
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