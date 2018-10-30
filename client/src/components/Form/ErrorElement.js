import React from "react";

export const ErrorElement = props => (
    <p {...props} style={{ color: "red" }}>
        {props.children}
    </p>
);
