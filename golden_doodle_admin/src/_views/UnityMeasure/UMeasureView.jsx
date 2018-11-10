import React from 'react';
import { connect } from 'react-redux';

import { unitiesActions } from '../../_actions';
import {Button,Modal,Dialog,DialogTitle,DialogActions} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TablePaginationActions  from '../../_components/UnityMeasure/TablePaginationActions';
import {Register,Edit}  from '../../_components/UnityMeasure';

class UMeasureView extends React.Component {
    constructor(props) {
        super(props);
        //dispatch action to get  items
        
        this.props.dispatch(
            unitiesActions.getAll()
        );
        
        this.state = {
            openRegister: false,
            openEdit:false,
            filters:[],
            data:[],
            order: 'asc',
            orderBy: 'name',
            selected: [],
            page: 0,
            rowsPerPage: 5,
            totalRows:0,
        };
    
    }
    
    handleDelete = (e,id,tableData)=>{
        
        this.setState({"openDelete":true,itemId:id});
    }
    handleEdit = (event,id,tableData) =>{
        
        
        this.setState({itemId:id,openEdit:true});

    }
    handleRowsPerPage = (rowsPerPageChild) =>{
         this.setState({rowsPerPage: rowsPerPageChild});
        this.props.dispatch(unitiesActions.getAll(this.state));
    }
    HandleChangePage = (changePage) =>{
        this.setState({page:changePage});
        
        this.props.dispatch(unitiesActions.getAll(this.state,changePage));
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
        this.props.dispatch(unitiesActions.delete(this.state.itemId));
        
    }
    

/*    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }
*/

    render() {
        var {unities} = this.props;
        var { filters,order,orderBy,selected,page,rowsPerPage,totalRows,data} = this.state;
        var table = unities.table ? unities.table : {filters,order,orderBy,selected,page,rowsPerPage,totalRows,data};



        return (
            <div>
                <TablePaginationActions 
                onChangeRowsPerPage={this.handleRowsPerPage} 
                onChangePage={this.HandleChangePage} 
                handleDelete={this.handleDelete} 
                handleEdit={this.handleEdit}
                tableData={
                    {      
                       filters:filters,
                        order: table.order,
                        orderBy: orderBy,
                        selected: selected,
                        data: table.data,
                        page: table.page,
                        rowsPerPage: table.rowsPerPage,
                        totalRows:table.totalRows
                  }
                }/>
                <Button 
                    variant="fab" color="primary" aria-label="Adicionar"
                    style={{position: 'absolute',bottom: 90,right: 25,}} 
                    onClick={()=>{this.setState({ openRegister: true })}}

                >
                    <AddIcon/>
                </Button>
                
                <Modal onClose={this.handleCloseRegister} open={this.state.openRegister}>
                    <Register  onClose={this.handleCloseRegister}/>
                </Modal>
                <Modal onClose={this.handleCloseEdit} open={this.state.openEdit}>
                    <Edit itemId={this.state.itemId}  onClose={this.handleCloseEdit}/>
                </Modal>
                <Dialog
                  open={this.state.openDelete}
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Deseja realmente excluir?"}</DialogTitle>
                  <DialogActions>
                    <Button onClick={this.handleCloseDelete} color="primary">
                      Não
                    </Button>
                    <Button onClick={this.handleConfirmDelete} color="primary" autoFocus>
                      Sim
                    </Button>
                  </DialogActions>
                </Dialog>                
            </div>
        );
    }
}

function mapStateToProps(state) {
    
    const { unities } = state;
    return {
        unities,
    };
}

const connectedUMeasureView = connect(mapStateToProps)(UMeasureView);
export { connectedUMeasureView as UMeasureView };