import React from "react";
import Sidebar from "../Entrance-FindTreMos/Sidebar";
import { Link } from "react-router-dom";
import Eye_illuminati_pyramid_triangle from "../../assets/Eye_illuminati_pyramid_triangle.png";
import bulb_pie_chat_light_idea from "../../assets/bulb_pie_chat_light_idea.png";
import user_like_staff_office_idea from "../../assets/user_like_staff_office_idea.png";

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
                src={Eye_illuminati_pyramid_triangle}
                alt="Entrance Gate"
                width="65px"
                /></button>
              </Link>
              <Link to="/createatremo">
                <button className="SidebarIconsButtons">
                <img
                  src={user_like_staff_office_idea}
                  alt="Create Tremo"
                  width="65px"
                /></button>
                {/* <span className="createATremo">Create a TreMo</span> */}
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
              <div id="TreasureChestSidebarItem">
              </div>
            </div>
          </Sidebar>
        </div>
      );
    };
    
    export default TreasureChest;