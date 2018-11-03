import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import {store} from './_helpers/store';
import {App} from './App';
import registerServiceWorker from './registerServiceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
ReactDOM.render(
	<Provider store={store}>
	 <React.Fragment>
      <CssBaseline />
      
		<App /> 
    </React.Fragment>
	</Provider>, document.getElementById('root'));
registerServiceWorker();
    
  
  