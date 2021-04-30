import React from "react";
import Sidebar from "./Sidebar";
import Geolocation from "./Geolocation"
import CreateIcon from "../assets/create-black-icon.png"

const CreateATreMo = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
        <Sidebar width={150} height={'100vh'}>
          <div>
            <a href="/"><img src={CreateIcon} alt="Create Tremo" width="150px" /></a>
            <a href="/"><img src={CreateIcon} alt="Create Tremo" width="150px" /></a>
            <a href="/"><img src={CreateIcon} alt="Create Tremo" width="150px" /></a>
            <a href="/"><img src={CreateIcon} alt="Create Tremo" width="150px" /></a>
          </div>
        </Sidebar>
        <Geolocation />
        </div>
        );
      };

export default CreateATreMo;