import React from "react";
import Sidebar from "./Sidebar";
import FindTremoGeolocation from "./FindTremoGeolocation";
import CreateBlackTremo from "../../assets/create-black-icon.png";
import CreateSingleTremoRoute from "../../assets/treasure-map.jpeg";
import CreateMultipleTremosRoute from "../../assets/multiple-map-journey-map.png";
import TreasureChest from "../../assets/bright-treasure-chest-icon.jpeg";
import { Link } from "react-router-dom";
import user_like_staff_office_idea from "../../assets/user_like_staff_office_idea.png";
import bulb_pie_chat_light_idea from "../../assets/bulb_pie_chat_light_idea.png";

const EntranceGate = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row-reverse" }}>
      <Sidebar
        width={300}
        height={"90vh"}
        style={{ backgroundImage: "url(assets/pyramideArtwork.jpeg)" }}
      >
        <div className="container">
          <Link to="/createatremo">
            <img
              src={user_like_staff_office_idea}
              alt="Create Tremo"
              width="100px"
            />
            {/* <span className="createATremo">Create a TreMo</span> */}
          </Link>
          <Link to="/treasurechest">
            <img
              src={bulb_pie_chat_light_idea}
              alt="TreasureChest"
              width="100px"
            />
            {/* <span className="createATremo">Treasure Chest</span> */}
          </Link>
        </div>
      </Sidebar>
      <FindTremoGeolocation />
    </div>
  );
};

export default EntranceGate;
