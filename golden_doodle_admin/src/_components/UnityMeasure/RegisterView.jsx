import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {TextField,Typography,Grid,Button} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

class RegisterView extends React.Component {
  constructor(props) {
    super(props);
      console.log("PROPS".props);
    if(props.category){
      this.state = {
        _id:props.category._id,
        name: props.category.name,
        title:props.title

      };
    }else{
      this.state = {
        
        name: "",
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
    var {_id,name,stocks} = this.state;
    this.props.onSend({_id,name,stocks});

  };

  render() {
    const { classes,categories,stocks } = this.props;
    

    return (
      <Grid container spacing={24} justify={"center"}>
        <form className={classes.container} noValidate autoComplete="off"  onSubmit={this.onSend}>
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
              placeholder="Nome do item"
              className={classes.textField}
              margin="normal"
            />
           
          
           

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
RegisterView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterView);