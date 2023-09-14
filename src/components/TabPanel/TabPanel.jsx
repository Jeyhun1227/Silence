import React from "react";

export const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <>
          <>{children}</>
        </>
      )}
    </div>
  );
};

export default TabPanel;
