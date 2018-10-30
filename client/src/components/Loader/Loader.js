import React from "react";

export const Loader = function(status) {
    if (status) {
        let element = document.getElementById('app-loader');
        element.classList.add('active-loader');
    } else {
        let element = document.getElementById('app-loader');
        element.classList.remove('active-loader');
    }
}