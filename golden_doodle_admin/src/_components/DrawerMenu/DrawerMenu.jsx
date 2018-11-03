import React from 'react';
import { Link } from 'react-router-dom';
import { List,Button,Divider,SwipeableDrawer} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {MenuItems} from './MenuItems';

export class DrawerMenu extends React.Component {
  constructor(props) {
    super(props);
   
    this. state = {
      left: false,
    };
  }


    toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };
  render() {

  const sideList = (
      <div >
        <List>{MenuItems}</List>
        <Divider />
        <List>{MenuItems}</List>
      </div>
  );
    return (
      <div>
         <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
        
    );
  }
}