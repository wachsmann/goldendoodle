import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {MenuItem,TextField,Typography,Grid,Button} from '@material-ui/core';
import NumberFormat from 'react-number-format';
import Icon from '@material-ui/core/Icon';

class EditView extends React.Component {
  constructor(props) {
    super(props);

    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
      
      this.state = {
        _id:user._id,
        name: user.name,
        password: "",
        stocks:user.stocks[0],
        title:props.title
      };
    }else{
      this.state = {
        
        name: "",
        password: "",
        stocks: [],
        title:props.title
      };
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  onSend = () => {
   
    this.setState({ submitted: true });
    var {name,password,stocks,_id} = this.state;
    this.props.onSend({_id,name,password,stocks});

  };

  render() {
    const { classes,stocks } = this.props;
    console.log("STOCKS",stocks);
    return (
      <Grid container spacing={24} justify={"center"}>
        <form className={classes.container} noValidate autoComplete="off">
           <Grid item xs={12}>
            <Typography variant="headline" component="h3">
              {this.state.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="name"
              value={this.state.name}
              onChange={this.handleChange('name')}              
              label="Nome"
              placeholder="Nome"
              className={classes.textField}
              margin="normal"
            />
            <TextField
              required
              id="password"
              value={this.state.password}
              onChange={this.handleChange('password')}              
              label="Senha"
              placeholder="Senha"
              className={classes.textField}
              margin="normal"
              type="password"
            />
          
           <TextField
              id="stocks"
              required
              select
              label="Estoques"
              className={classes.textField}
              value={this.state.stocks}
              onChange={this.handleChange('stocks')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Selecione um estoque"
              margin="normal"
            >
              {stocks && stocks.map(option => (
                <MenuItem key={option._id} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            
            
            </Grid>
            <Grid container spacing={24} justify={"flex-end"}>
            <Button onClick={this.onSend} variant="contained" color="primary" size="medium" className={classes.button}>
            
            <Icon className={classes.rightIcon}>send</Icon>
            </Button>
            </Grid>
        </form>
      </Grid>
    );
  }
}
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%",
  },
  menu: {
    width: 200,
  },
  button:{


  }
});
EditView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditView);