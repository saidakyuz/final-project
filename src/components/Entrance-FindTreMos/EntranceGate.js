import React from "react";
import Sidebar from "./Sidebar";
import FindTremoGeolocation from "./FindTremoGeolocation";
import CreateBlackTremo from "../../assets/create-black-icon.png";
import CreateSingleTremoRoute from "../../assets/treasure-map.jpeg";
import CreateMultipleTremosRoute from "../../assets/multiple-map-journey-map.png";
import TreasureChest from "../../assets/bright-treasure-chest-icon.jpeg";
import { Link } from "react-router-dom";

const EntranceGate = () => {
  return (
  <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
  <Sidebar width={150} height={'100vh'}>
    <div>
      <Link to="/createatremo"><img src={CreateBlackTremo} alt="Create Tremo" width="150px" /></Link>
      <Link to="/createsingletremoreo"><img src={CreateSingleTremoRoute} alt="Create Single Tremo Route" width="150px" /></Link>
      <Link to="/"><img src={CreateMultipleTremosRoute} alt="Create Multiple Tremos Route" width="150px" /></Link>
      <Link to="/"><img src={TreasureChest} alt="TreasureChest" width="150px" /></Link>
    </div>
  </Sidebar>
  <FindTremoGeolocation />
  </div>
  );
};

export default EntranceGate;
