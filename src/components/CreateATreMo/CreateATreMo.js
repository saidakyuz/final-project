import React from "react";
import Sidebar from "../Entrance-FindTreMos/Sidebar";
import CreateTremoGeolocation from "./CreateTremoGeolocation";
import { Link } from "react-router-dom";
import Eye_illuminati_pyramid_triangle from "../../assets/Eye_illuminati_pyramid_triangle.png";
import user_like_staff_office_idea from "../../assets/user_like_staff_office_idea.png";
import marketing_Business_idea_pertinent_Gear from "../../assets/marketing_Business_idea_pertinent_Gear.png";


const CreateATreMo = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row-reverse" }}>
      <Sidebar 
        width={555}
        height={"90vh"}
      >
        <div id="CreateTremoSidebarContainer">
          <div id="CreateTremoSidebarItemIcons">
          <Link to="/entrancegate">
            <button className="SidebarIconsButtons">
            <img
              src={user_like_staff_office_idea}
              alt="Entrance Gate"
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
          <Link to="/helpinspirations">
            <button className="SidebarIconsButtonsRight">
            <img 
            src={marketing_Business_idea_pertinent_Gear}
            alt="HelpInspirations"
            width="65px" 
            /></button>
          </Link>
          </div>
          <div id="CreateTremoSidebarItem">
            <div className="Blocktext">
                   <p><h5>Create Tremo[s]</h5></p>
                   <br />
                   <p><h6># let the world shine full of diamonds</h6></p>
                   <br />
                   <p><h6># let your creativity flow</h6></p>
                   <br />
                   <p><h6># share special details</h6></p>
            </div>
          </div>
        </div>
      </Sidebar>
      <CreateTremoGeolocation />
    </div>
  );
};

export default CreateATreMo;
