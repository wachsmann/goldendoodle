import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {AlertBar} from '../_components/AlertBar';
import MainNavbar from '../_components/MainNavbar';
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <div><MainNavbar/><AlertBar/><Component {...props} /></div>
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)