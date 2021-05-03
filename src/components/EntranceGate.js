import React from "react";
import Sidebar from "./Sidebar";
import Geolocation from "./Geolocation"
import CreateBlackTremo from "../assets/create-black-icon.png"
import CreateSingleTremoRoute from "../assets/treasure-map.jpeg"
import CreateMultipleTremosRoute from "../assets/multiple-map-journey-map.png"
import TreasureChest from "../assets/bright-treasure-chest-icon.jpeg"
import CreateATremo from "./CreateATreMo";

const EntranceGate = () => {
  return (
  <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
  <Sidebar width={150} height={'100vh'}>
    <div>
      <a href="CreateATreMo"><img src={CreateBlackTremo} alt="Create Tremo" width="150px" /></a>
      <a href="/"><img src={CreateSingleTremoRoute} alt="Create Single Tremo Route" width="150px" /></a>
      <a href="/"><img src={CreateMultipleTremosRoute} alt="Create Multiple Tremos Route" width="150px" /></a>
      <a href="/"><img src={TreasureChest} alt="TreasureChest" width="150px" /></a>
    </div>
  </Sidebar>
  <Geolocation />
  </div>
  );
};

export default EntranceGate;
