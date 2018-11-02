import React from "react";

export const Col = ({ size, children, tagClass = '' }) => (
  <div className={`${size.split(" ").map(size => "col-" + size).join(" ")} ${tagClass}`}>
    {children}
  </div>
);
