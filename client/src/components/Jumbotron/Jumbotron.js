import React from "react";

const Jumbotron = ({ height, children }) => (
  <div style={{ height: height, clear: "both" }} className="jumbotron">
    {children}
  </div>
);

export default Jumbotron;
