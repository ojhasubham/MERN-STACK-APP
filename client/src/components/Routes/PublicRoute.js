'use strict';

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => {
        return (
            isAuthenticated() === false
                ? <Component {...props} />
                : props && props.location && props.location.pathname && props.location.pathname === '/404' ? <Component {...props} /> : <Redirect to={{
                    pathname: '/books',
                    state: { from: props.location }
                }} />
        )
    }} />
)

export default PublicRoute; 