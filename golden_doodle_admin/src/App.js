import React, { Component } from 'react';
import './App.css';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './_helpers';
import { alertActions } from './_actions';
import { PrivateRoute } from './_components';
import { HomeView,LoginView,RegisterView,UserView,AccountView,UMeasureView,CategoryView,StockView } from './_views';

class App extends Component {
  constructor(props) {
      super(props);

     history.listen((location, action) => {
          // clear alert on location change
          this.props.dispatch(alertActions.clear());
      });
  }  
  render() {
    
    return (                 
      <Router history={history}>
          <div>

              <PrivateRoute exact path="/" component={HomeView} />
              <PrivateRoute exact path="/usuarios" component={UserView} />
              <PrivateRoute exact path="/conta" component={AccountView} />
              <PrivateRoute exact path="/medidas" component={UMeasureView} />
              <PrivateRoute exact path="/categorias" component={CategoryView} />
              <PrivateRoute exact path="/estoques" component={StockView} />
              <Route path="/login" component={LoginView} />
              <Route path="/register" component={RegisterView} />
          </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 