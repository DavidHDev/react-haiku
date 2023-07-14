import React from "react";

export const Class = ({ className, toggleClass, isActive, children }) => {
  const classes = `${className} ${isActive ? toggleClass : ""}`;
  return <div className={classes}>{children}</div>;
};
