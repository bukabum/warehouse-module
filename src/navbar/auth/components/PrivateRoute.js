import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../token/Api';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/Warehouse-1.0/log/in" />
        )} />
    );
};

export default PrivateRoute;
