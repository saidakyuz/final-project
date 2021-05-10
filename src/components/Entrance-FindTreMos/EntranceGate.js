import React, {useState} from "react";
import Sidebar from "./Sidebar";
import FindTremoGeolocation from "./FindTremoGeolocation";
import SidebarTremoCard from './SidebarTremoCard'
import { Link } from "react-router-dom";
import user_like_staff_office_idea from "../../assets/user_like_staff_office_idea.png";
import diamound_shine_expensive_stone from "../../assets/diamound_shine_expensive_stone.png";
import bulb_pie_chat_light_idea from "../../assets/bulb_pie_chat_light_idea.png";

const EntranceGate = () => {
  const [activeHunt, setActiveHunt] = useState()
  return (
    <div style={{ display: "flex", flexDirection: "row-reverse" }}>
      <Sidebar
        width={555}
        height={"90vh"}
      >
        <div id="EntranceGateSidebarContainer">
          <div className="EntranceGateSidebarItemIcons">
          <Link to="/createatremo">
            <button className="SidebarIconsButtons">
            <img
              src={user_like_staff_office_idea}
              alt="Create Tremo"
              width="65px"
            /></button>
          </Link>
          <Link to="/treasurechest">
            <button className="SidebarIconsButtons">
            <img
              src={diamound_shine_expensive_stone}
              alt="Treasure Chest"
              width="65px"
            /></button>
          </Link>
          <Link to="/help">
            <button className="SidebarIconsButtonsRight">
            <img 
            src={bulb_pie_chat_light_idea}
            alt="help"
            width="65px" 
            /></button>
          </Link>
          </div>
          <div id="EntranceGateSidebarItemFindATremoHunt">
          <SidebarTremoCard tremo={activeHunt}/>
          </div>
        </div>
      </Sidebar >
      <FindTremoGeolocation setActiveHunt={setActiveHunt}/>
    </div>
  );
};

export default EntranceGate;
