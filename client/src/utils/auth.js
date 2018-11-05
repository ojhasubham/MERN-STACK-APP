'use strict';

import React from 'react';

/**
 * Check the user authenticated or not.
 * @returns {Boolean} valid true if the authenticated.
 */
function isAuthenticated() {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');

    if (token && user) {
        return true;
    } else {
        return false;
    }
}

/**
 * Get the details of the authenticated user. 
 * @returns {Object}
 */
function getAuthUser() {
    let user = LocalStorageUtils.get('user');

    return user ? user : {};
}

export { isAuthenticated, getAuthUser };