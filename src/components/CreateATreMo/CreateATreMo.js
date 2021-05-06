import React from 'react';
import Sidebar from '../Entrance-FindTreMos/Sidebar';
import CreateTremoGeolocation from './CreateTremoGeolocation';
import CreateIcon from '../../assets/create-black-icon.png';

const CreateATreMo = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
      {/* <Sidebar width={180} height={'100vh'}>
          <div className="container">
          <button >
          <img src={CreateIcon} alt="Create Tremo" width="150px" />
            </button><button>
          <img src={CreateIcon} alt="Create Tremo" width="150px" />
            </button><button>
          <img src={CreateIcon} alt="Create Tremo" width="150px" />
            </button><button>
          <img src={CreateIcon} alt="Create Tremo" width="150px" />
            </button>
          </div>
        </Sidebar> */}
      <CreateTremoGeolocation />
    </div>
  );
};

export default CreateATreMo;
