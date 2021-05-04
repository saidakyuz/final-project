import React, { useState, useRef, useCallback } from 'react';
import ReactMapGL, { GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

const CreateTremoGeolocation = () => {
  const geolocateControlStyle= {
   left: 10,
   top: 10
  };

  const [viewport, setViewport] = useState({
    latitude: 52.52,
    longitude: 13.405,
    zoom: 13,
   });
  
  const [userCoordinatesAtTremo, setUserCoordinatesAtTremo] = useState()
  /* const [clickedLocation, setClickedLocation] = useState() */
  const [userRadiusEdgeCoordinates, setUserRadiusEdgeCoordinates] = useState()

   const mapRef = useRef();

   const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const getUserCoordinatesAtTremo = (e) =>{
    setUserCoordinatesAtTremo({lat: e.coords.latitude, lng:e.coords.longitude})
  }

  /* const getCoordinates = (e) =>{
    setClickedLocation({lat:e.lngLat[1], lng: e.lngLat[0]})
  } */
  const getSecondUserCoordinatesAtRadiusEdge = (e) => {
    setUserRadiusEdgeCoordinates({lat:e.lngLat[1], lng:e.lngLat[0]})
  }

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

 

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
     <ReactMapGL 
    ref={mapRef}
    {...viewport} 
    width="100vw" 
    height="90vh" 
    onViewportChange={setViewport}
    //onClick={getCoordinates}
    onClick={getSecondUserCoordinatesAtRadiusEdge}
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}>
      <GeolocateControl
        // onGeolocate={getUserLocation}
        onGeolocate={getUserCoordinatesAtTremo}
        style={geolocateControlStyle}
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={true}
        auto
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      />
        {/* <Geocoder
          mapRef={mapRef}
          style={geolocateControlStyle}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          position="bottom-left"
        /> */}
    </ReactMapGL>
    </div>
  );
};

export default CreateTremoGeolocation;