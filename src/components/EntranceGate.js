import React from "react";
import Map from "./Map";
import Sidebar from "./Sidebar";

const EntranceGate = () => {
  return (
  <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
  <Sidebar width={300} height={'100vh'}>
          <h1>Nav Item</h1>
          <h1>Nav Item</h1>
          <h1>Nav Item</h1>
          <h1>Nav Item</h1>
          <h1>Nav Item</h1>
  </Sidebar>
  <Map/>
  </div>
  );
};

export default EntranceGate;
