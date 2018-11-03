import React from 'react';
import { Link } from 'react-router-dom';
import { Button,AppBar,Typography,Toolbar,IconButton,List,SwipeableDrawer} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {MenuItems} from './DrawerMenu/MenuItems';
import './index.css';
//import AppBar from './AppBar';
export default class MainNavbar extends React.Component {
  constructor(props) {
    super(props);
    var obj =JSON.parse(localStorage.getItem('user'));
    this.state = {
      user: obj,
      open:false,
    };
  }
    toggleDrawer = (action) => () => {
    this.setState({
      open: action,
    });
  };
  render() {
  const styles = {
    root: {
      flexGrow: 1,
      
    },
    flex: {
      flex: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    userButton:{
      marginRight: 10,
    }
  };
    const {user,open} = this.state;
    return (
        <div >
                 <div>
         <SwipeableDrawer
          open={open}
          onClose={this.toggleDrawer(false)}
          onOpen={this.toggleDrawer(true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
          <List>{MenuItems}</List>
      
          </div>
        </SwipeableDrawer>
      </div><div className={styles.root}>
            <AppBar position="static">
            <Toolbar>
               
              <IconButton onClick={this.toggleDrawer(true)} color="inherit" aria-label="Menu">
                <MenuIcon />
                </IconButton>
              <Typography  variant="title" color="inherit" className="nav-title">
                Estoque LMD
              </Typography>
              
              
               <Link  to="/conta"  ><Button  style={styles.userButton} variant="contained" color="primary">Conta</Button></Link>

              <Link  to="/login"  ><Button  variant="contained" color="primary">Sair</Button></Link>
              
            </Toolbar>
          </AppBar>
        </div>
        </div>
    );
  }
}