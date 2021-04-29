import React, { useState } from 'react';
import ReactMapGL, { GeolocateControl } from "react-map-gl";

const Geolocation = () => {
  const geolocateControlStyle= {
   left: 10,
   top: 10
  };
 

  const [viewport, setViewport] = useState({
    latitude: 52.52,
    longitude: 13.405,
    zoom: 13,
   });

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
    <ReactMapGL 
    {...viewport} 
    width="100vw" 
    height="100vh" 
    onViewportChange={setViewport}
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}>
      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={true}
        auto
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      />
    </ReactMapGL>
    </div>
  );
};

export default Geolocation;