import React from "react";

const InfoPopup = ({ tp }) => {
  console.log(tp.picture);
  return (
    <div classname="InfoPopup">
      <div>
        <p>{tp.hint}</p>
      </div>
      <img height={"100rem"} src={tp.picture} />
    </div>
  );
};

export default InfoPopup;
