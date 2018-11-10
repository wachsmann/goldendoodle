import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Snack from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import {Close,InfoOutlined,Warning,Check} from "@material-ui/icons";

import snackbarContentStyle from "../../assets/jss/material-kit-react/components/snackbarContentStyle.jsx";
import {alertActions } from '../../_actions';

class SnackbarContent extends React.Component {
  constructor(props) {
    super(props);
    this.closeAlert = this.closeAlert.bind(this);


  }
  closeAlert() {
    
    this.props.dispatch(alertActions.clear());
  }
  render() {
    const { classes, message, close,type } = this.props;
    var action = [];
    if (close !== undefined) {
      action = [
        <IconButton
          className={classes.iconButton}
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={this.closeAlert}
        >
          <Close className={classes.close} />
        </IconButton>
      ];
    }
    var color = "primary";     
    var icon = <Warning className={classes.icon} />;   
    switch(type){
      case "SUCCESS":
        color = "success";
        icon = <Check className={classes.icon} />;
        break;
      case "ERROR":
        color = "danger";
        icon = <InfoOutlined className={classes.icon} />;
        break;
      case "WARNING":
        color = "warning";
        icon = <Warning className={classes.icon} />;
        break;
      default:
        

         
    }

    return (
          <Snack
            message={
              <div>
                {icon !== undefined ? (
                  icon
                ) : null}
                {message}
                {close !== undefined ? action : null}
              </div>
            }
            classes={{
              root: classes.root + " " + classes[color],
              message: classes.message + " " + classes.container
            }}
          />
    )
  }
}

SnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.node.isRequired,
  //color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
  close: PropTypes.bool,
  type:PropTypes.node.isRequired
};

export default withStyles(snackbarContentStyle)(SnackbarContent);
