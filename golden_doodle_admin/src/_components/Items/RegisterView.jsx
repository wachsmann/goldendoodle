import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {MenuItem,TextField,Typography,Grid,Button} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

class RegisterView extends React.Component {
  constructor(props) {
    super(props);
    
    if(props.item){

      
      this.state = {
        _id:props.item._id,
        name: props.item.name,
        categories: props.item.category,
        unities: props.item.unity_measure,
        qtt:props.item.qtt,
        title:props.title
      };
    }else{
      this.state = {
        
        name: "",
        categories: -1,
        unities: -1,
        qtt:0,
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
    console.log("teste"); 
    this.setState({ submitted: true });
    var {name,categories,unities,qtt,_id} = this.state;
    this.props.onSend({_id,name,categories,unities,qtt});

  };

  render() {
    const { classes,categories,unities } = this.props;
    

    return (
      <Grid container spacing={24} justify={"center"}>
        <form onSubmit={this.onSend} className={classes.container} noValidate autoComplete="off">
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
              label="Nome do item"
              placeholder="Nome do item"
              className={classes.textField}
              margin="normal"
            />
           
          
           <TextField
              id="categories"
              required
              select
              label="Categorias"
              className={classes.textField}
              value={this.state.categories}
              onChange={this.handleChange('categories')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Selecione uma categoria"
              margin="normal"
            >
              {categories && categories.map(option => (
                <MenuItem key={option._id} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            
            <TextField
              id="unities"
              required
              select
              label="Unidade de Medida"
              className={classes.textField}
              value={this.state.unities}
              onChange={this.handleChange('unities')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Selecione uma unidade de medida"
              margin="normal"
            >
              {unities &&  unities.map(option => (
                <MenuItem key={option._id} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>            

            <TextField
              id="qtt"
              pattern="[0-9]*"
              required
              label="Quantidade"
              className={classes.textField}
              value={this.state.qtt}
              onChange={this.handleChange('qtt')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Selecione uma quantidade"
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