import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import FindTremoGeolocation from './FindTremoGeolocation';
import SidebarTremoCard from './SidebarTremoCard';
import { distance } from '../../utils/utils';
import user_like_staff_office_idea from '../../assets/user_like_staff_office_idea.png';
import bulb_pie_chat_light_idea from '../../assets/bulb_pie_chat_light_idea.png';
import diamound_shine_expensive_stone from "../../assets/diamound_shine_expensive_stone.png";
import marketing_Business_idea_pertinent_Gear from "../../assets/marketing_Business_idea_pertinent_Gear.png";
import Eye_illuminati_pyramid_triangle from "../../assets/Eye_illuminati_pyramid_triangle.png";

const EntranceGate = () => {
  const { userLocation } = useContext(AuthContext);
  const [activeHunt, setActiveHunt] = useState();

  useEffect(() => {
    if (activeHunt) {
      const distanceFromTremo = distance(
        activeHunt.location._lat,
        activeHunt.location._long,
        userLocation.lat,
        userLocation.lng,
        'K'
      );
      setActiveHunt(prev => ({ ...prev, distanceFromTremo }));
    }
  }, [userLocation]);

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
              /*src={user_like_staff_office_idea}*/
              src={diamound_shine_expensive_stone}
              alt="Create Tremo"
              width="65px"
            /></button>
          </Link>
          <Link to="/treasurechest">
            <button className="SidebarIconsButtons">
            <img
              /*src={diamound_shine_expensive_stone}*/
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
          <div id='EntranceGateSidebarItemFindATremoHunt'>
            <SidebarTremoCard tremo={activeHunt} />
          </div>
        </div>
      </Sidebar>
      <FindTremoGeolocation setActiveHunt={setActiveHunt} />
    </div>
  );
};

export default EntranceGate;
