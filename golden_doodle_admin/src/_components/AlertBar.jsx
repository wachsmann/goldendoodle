import React from 'react';
import { connect } from 'react-redux';
import SnackbarContent from './Snackbar/SnackbarContent';

class AlertBar extends React.Component {

  render() {
    const { alert } = this.props;

    return (
        <div>
          {alert.message &&
             <SnackbarContent
                message={
                  <span>
                   {alert.message}
                  </span>
                }
                close
                dispatch={this.props.dispatch}
                type={alert.type}
                
              />
             
          }
        </div>
    );
  }
}
function mapStateToProps(state) {
    
    const { alert } = state;
    
    return {
      alert
    };
}

const connectedAlertBar = connect(mapStateToProps)(AlertBar);
export { connectedAlertBar as AlertBar };