import React from "react";
// import * as React from 'react';
import { useState, useRef, useCallback } from "react";
import MapGL from "react-map-gl";
import { Container, Row, Col } from "react-bootstrap";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import Geocoder from "react-map-gl-geocoder";

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 52.52,
    longitude: 13.405,
    zoom: 13,
  });
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

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          position="top-left"
        />
      </MapGL>
    </div>
  );
};

export default Map;
