import React from "react";
import Sidebar from "./Sidebar";
import FindTremoGeolocation from "./FindTremoGeolocation";
import { Link } from "react-router-dom";
//import SidebarFindATremoHunt from "./SidebarFindATremoHunt";
import user_like_staff_office_idea from "../../assets/user_like_staff_office_idea.png";
import diamound_shine_expensive_stone from "../../assets/diamound_shine_expensive_stone.png";
import bulb_pie_chat_light_idea from "../../assets/bulb_pie_chat_light_idea.png";
import BeepleIntoTheEtherTokenArt from "../../assets/BeepleIntoTheEtherTokenArt.jpeg";

const EntranceGate = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row-reverse" }}>
      <Sidebar
        width={555}
        height={"90vh"}
      >
        <div id="EntranceGateSidebarContainer">
          <div id="EntranceGateSidebarItemIcons">
          <Link to="/createatremo">
            <button className="SidebarIconsButtons">
            <img
              src={user_like_staff_office_idea}
              alt="Create Tremo"
              width="65px"
            /></button>
            {/* <span className="createATremo">Create a TreMo</span> */}
          </Link>
          <Link to="/treasurechest">
            <button className="SidebarIconsButtons">
            <img
              src={diamound_shine_expensive_stone}
              alt="TreasureChest"
              width="65px"
            /></button>
            {/* <span className="createATremo">Treasure Chest</span> */}
          </Link>
          <Link to="/help">
            <button className="SidebarIconsButtons">
            <img 
            src={bulb_pie_chat_light_idea}
            alt="help"
            width="65px" 
            /></button>
          </Link>
          </div>
          <div id="EntranceGateSidebarItemFindATremoHunt">
            {/* <SidebarFindATremoHunt /> */}
          </div>
        </div>
      </Sidebar>
      <FindTremoGeolocation />
    </div>
  );
};

export default EntranceGate;
