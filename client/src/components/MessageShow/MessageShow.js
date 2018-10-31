import React from "react";

export const noRecordFound = (msg) => (
    <center>
        <br />
        <h3>{msg ? msg : `No record found.`}</h3>
    </center>
);