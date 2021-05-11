import React from "react";
import Sidebar from "../Entrance-FindTreMos/Sidebar";
import { Link } from "react-router-dom";
import user_like_staff_office_idea from "../../assets/user_like_staff_office_idea.png";
import diamound_shine_expensive_stone from "../../assets/diamound_shine_expensive_stone.png";
import Eye_illuminati_pyramid_triangle from "../../assets/Eye_illuminati_pyramid_triangle.png";



const HelpInspirations = () => {
    return (
      <div id="BackgroundInspirations">
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <Sidebar
            width={555}
            height={"90vh"}
          >
            <div id="HelpInspirationsSidebarContainer">
              <div id="HelpInspirationsSidebarItemIcons">
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
              </Link>
              <Link to="/treasurechest">
            <button className="SidebarIconsButtons">
            <img
              src={Eye_illuminati_pyramid_triangle}
              alt="Treasure Chest"
              width="65px"
              /></button>
              </Link>
              </div>
              <div id="HelpInspirationsSidebarItem">
              </div>
            </div>
          </Sidebar>
          </div>
        </div>
      );
    };
    
    export default HelpInspirations;