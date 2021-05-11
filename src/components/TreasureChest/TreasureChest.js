import React from "react";
import Sidebar from "../Entrance-FindTreMos/Sidebar";
import { Link } from "react-router-dom";
import user_like_staff_office_idea from "../../assets/user_like_staff_office_idea.png";
import diamound_shine_expensive_stone from "../../assets/diamound_shine_expensive_stone.png";
import marketing_Business_idea_pertinent_Gear from "../../assets/marketing_Business_idea_pertinent_Gear.png";
import earthwithlightsnetworks from "../../assets/wwkllopopo.jpeg";


const TreasureChest = () => {
    return (
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <Sidebar
            width={555}
            height={"90vh"}
          >
            <div id="TreasureChestSidebarContainer">
              <div id="TreasureChestSidebarItemIcons">
              <Link to="/entrancegate">
                <button className="SidebarIconsButtons">
                <img
                src={user_like_staff_office_idea}
                alt="Entrance Gate"
                width="65px"
                /></button>
              </Link>
              <Link to="/createatremo">
                <button className="SidebarIconsButtons">
                <img
                  src={diamound_shine_expensive_stone}
                  alt="Create Tremo"
                  width="65px"
                /></button>
                {/* <span className="createATremo">Create a TreMo</span> */}
              </Link>
              <Link to="/helpinspirations">
                <button className="SidebarIconsButtonsRight">
                <img 
                src={marketing_Business_idea_pertinent_Gear}
                alt="HelpInspirations"
                width="65px" 
                /></button>
              </Link>
              </div>
              <div id="TreasureChestSidebarItem">
              </div>
            </div>
          </Sidebar>
          <img src={earthwithlightsnetworks} alt="backgroundEarth" width= "100%" height= "90%" />
        </div>
      );
    };
    
    export default TreasureChest;