import React from 'react';
import { Button,TextField,Grid,Typography} from '@material-ui/core';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';
import './index.css';
import SnackbarContent from '../../_components/Snackbar/SnackbarContent';
import {AlertBar} from '../../_components/AlertBar';

class LoginView extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());
    
    this.state = {
      username: {type:false,message:"",value:""},
      password: {type:false,message:"",value:""},
  
      submitted: false,
    };
    this.userNameInput = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   
  }

    
  handleChange(e) {
    const { name, value } = e.target;
    console.log(name,value);
    this.setState({ [name]: {value,type:value?0:1} });


  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username.value && password.value) {
      dispatch(userActions.login(username.value, password.value));
    }else{

      this.setState({username:{type:true},password:{type:true}})
      
    }

  } 

  render() {

    const { alert } = this.props;
    const { username, password } = this.state;
    return (

                <div className={{flexGrow: 1}}>
                  <AlertBar/>
                    <Grid container justify={"center"}>
                        
                           
                        <form onSubmit={this.handleSubmit}>
                         <Typography className={"main-title"} variant="subheading" gutterBottom>
                              Admin Estoque
                              </Typography>
                      
                        <Grid item xs={12}>
                              <TextField
                                 helperText={username.message}
                                
                                label="Nome"
                                name="username"
                                type="text"
                                value={username.value}
                                onChange={this.handleChange}
                              />
                            
                            
                        
                        </Grid>
                               

                            <Grid item xs={12}>
                                <TextField
                                 helperText={password.message}
                                label="Sua senha"
                                name="password"
                                type="password"
                                
                                value={password.value}
                                onChange={this.handleChange}
                              />    
                                
                               
                                </Grid>
                            <div id="buttonSubmit" >
                                <Button className="login-btn" variant="contained" color="primary" size="large"  type="submit">Entrar</Button>
                            </div>
                        </form>
                    </Grid>
                </div>

    );
  }
}


function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    const { alert } = state;
    return {
        loggingIn,
        alert
    };
}

const connectedLoginView = connect(mapStateToProps)(LoginView);
export { connectedLoginView as LoginView }; 