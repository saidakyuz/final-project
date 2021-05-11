import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import FindTremoGeolocation from './FindTremoGeolocation';
import SidebarTremoCard from './SidebarTremoCard';
import { distance } from '../../utils/utils';
import user_like_staff_office_idea from '../../assets/user_like_staff_office_idea.png';
import diamound_shine_expensive_stone from '../../assets/diamound_shine_expensive_stone.png';
import bulb_pie_chat_light_idea from '../../assets/bulb_pie_chat_light_idea.png';

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
    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
      <Sidebar width={'300'} height={'90vh'}>
        <div id='EntranceGateSidebarContainer'>
          <div className='container'>
            <div className='row'>
              <div className='col-4 p-0'>
                <Link to='/createatremo'>
                  <button className='SidebarIconsButtons'>
                    <img src={user_like_staff_office_idea} alt='Create Tremo' width='65px' />
                  </button>
                </Link>
              </div>
              <div className='col-4 p-0'>
                <Link to='/treasurechest'>
                  <button className='SidebarIconsButtons'>
                    <img src={diamound_shine_expensive_stone} alt='Treasure Chest' width='65px' />
                  </button>
                </Link>
              </div>
              <div className='col-4 p-0'>
                <Link to='/help'>
                  <button className='SidebarIconsButtons'>
                    <img src={bulb_pie_chat_light_idea} alt='help' width='65px' />
                  </button>
                </Link>
              </div>
            </div>
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
