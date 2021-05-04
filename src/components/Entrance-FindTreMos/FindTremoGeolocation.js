  
import React, { useState, useRef, useEffect,useCallback } from 'react';
import ReactMapGL, { GeolocateControl ,Marker} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import { db} from '../../firebase/firebase'
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

const FindTremoGeolocation = () => {
  const geolocateControlStyle= {
   left: 10,
   top: 10
  };
  const [viewport, setViewport] = useState({
    latitude: 52.52,
    longitude: 13.405,
    zoom: 13,
   });
   const [tremoPoints, setTremoPoints] = useState()
   const mapRef = useRef();

   const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

   const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  useEffect(()=>{
    const unsubscribe = db.collection('tremos').onSnapshot(querySnapshot=> {
      const tremos = querySnapshot.docs.map(doc => doc.data())
      setTremoPoints(tremos)
    })

    return () => unsubscribe();
  },[])

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
    <ReactMapGL 
    ref={mapRef}
    {...viewport} 
    width="100vw" 
    height="90vh" 
    onViewportChange={setViewport}
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}>
     {tremoPoints && tremoPoints.map(tp => ( <Marker latitude={tp.location.latitude} longitude={tp.location.longitude} offsetLeft={-20} offsetTop={-10}>
      ❓
      </Marker>))}
      <GeolocateControl
      
        style={geolocateControlStyle}
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={true}
        auto
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      />
        <Geocoder
          mapRef={mapRef}
          style={geolocateControlStyle}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          position="bottom-left"
        />
    </ReactMapGL>
    </div>
  );
};

export default FindTremoGeolocation;