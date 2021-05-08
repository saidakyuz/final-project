import React from "react";
import Sidebar from "./Sidebar";
import FindTremoGeolocation from "./FindTremoGeolocation";
import CreateBlackTremo from "../../assets/create-black-icon.png";
import { Link } from "react-router-dom";
import pyramideArtwork from "../../assets/pyramideArtwork.jpeg";
import user_like_staff_office_idea from "../../assets/user_like_staff_office_idea.png"
import bulb_pie_chat_light_idea from "../../assets/bulb_pie_chat_light_idea.png"

const EntranceGate = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row-reverse" }}>
      <Sidebar width={300} height={"70vh"}>
        <div className="container" id="findTremoSidebar">
          <Link to="/createatremo">
          <img src={user_like_staff_office_idea} alt="Create Tremo" width="75px" />
            <span className="createATremo">Create a TreMo</span>
          </Link>
          <Link to="/treasurechest">
            <img src={bulb_pie_chat_light_idea} alt="TreasureChest" width="75px" />
            <span className="createATremo">Treasure Chest</span>
          </Link>
        </div>
      </Sidebar>
      <FindTremoGeolocation />
    </div>
  );
};

export default EntranceGate;
