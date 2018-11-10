import React from 'react';
import { connect } from 'react-redux';

import { categoriesActions } from '../../_actions';
import {Button,Modal,Dialog,DialogTitle,DialogActions} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TablePaginationActions  from '../../_components/Category/TablePaginationActions';
import {Register,Edit}  from '../../_components/Category';

class CategoryView extends React.Component {
    constructor(props) {
        super(props);
        //dispatch action to get  items
        
        this.props.dispatch(
            categoriesActions.getAll()
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
        //console.log("HOMEVIEW",tableData,e,id);
        this.setState({"openDelete":true,itemId:id});
    }
    handleEdit = (event,id,tableData) =>{
        
        this.setState({itemId:id,openEdit:true});

    }
    handleRowsPerPage = (rowsPerPageChild) =>{
        //this.state.rowsPerPage = rowsPerPageChild;
        this.setState({rowsPerPage:rowsPerPageChild});
        this.props.dispatch(categoriesActions.getAll(this.state));
    }
    HandleChangePage = (changePage) =>{
        this.setState({page:changePage});
        this.props.dispatch(categoriesActions.getAll(this.state));


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
        //console.log("Delete",this.state.itemId);
        this.props.dispatch(categoriesActions.delete(this.state.itemId));
        
    }
    

/*    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }
*/

    render() {
        var {categories} = this.props;
        var { filters,order,orderBy,selected,page,rowsPerPage,totalRows,data} = this.state;
        var table = categories.table ? categories.table : {filters,order,orderBy,selected,page,rowsPerPage,totalRows,data};

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
                }
                count={table.data.length}
                />
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
    
    const { categories } = state;

    return {
        categories,
    };
}

const connectedCategoryView = connect(mapStateToProps)(CategoryView);
export { connectedCategoryView as CategoryView };