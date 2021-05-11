import React from 'react';
import Sidebar from '../Entrance-FindTreMos/Sidebar';
import CreateTremoGeolocation from './CreateTremoGeolocation';
import { Link } from 'react-router-dom';
import Eye_illuminati_pyramid_triangle from '../../assets/Eye_illuminati_pyramid_triangle.png';
import diamound_shine_expensive_stone from '../../assets/diamound_shine_expensive_stone.png';
import bulb_pie_chat_light_idea from '../../assets/bulb_pie_chat_light_idea.png';

const CreateATreMo = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
      <Sidebar width={300} height={'90vh'}>
        <div id='CreateTremoSidebarContainer'>
          <div className='container'>
            <div id='CreateTremoSidebarItemIcons' className='row container'>
              <div className='col'>
                <Link to='/entrancegate'>
                  <button className='SidebarIconsButtons'>
                    <img src={Eye_illuminati_pyramid_triangle} alt='Entrance Gate' width='65px' />
                  </button>
                </Link>
              </div>
              <div className='col'>
                <Link to='/treasurechest'>
                  <button className='SidebarIconsButtons'>
                    <img src={diamound_shine_expensive_stone} alt='Treasure Chest' width='65px' />
                  </button>
                </Link>
              </div>
              <div className='col'>
                <Link to='/help'>
                  <button className='SidebarIconsButtons'>
                    <img src={bulb_pie_chat_light_idea} alt='help' width='65px' />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div id='CreateTremoSidebarItem'></div>
        </div>
      </Sidebar>
      <CreateTremoGeolocation />
    </div>
  );
};

export default CreateATreMo;
