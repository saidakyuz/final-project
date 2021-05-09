import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import ReactMapGL, { GeolocateControl, Marker, Source, Layer, Popup } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firebase/firebase';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import TremoFoundDiamond from "../../assets/lilaSpizerDiamant.png";
import NeonCircle from "../../assets/blue-pink-neon-circle.png";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import reactDom from "react-dom";
import InfoPopup from "./InfoPopup";

const FindTremoGeolocation = () => {
  const { user } = useContext(AuthContext);
  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [13.375165166, 52.509831294] },
      },
    ],
  };

  const circleRadius = 50;

  const layerStyle = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": circleRadius,
      "circle-opacity": 0.5,
      "circle-color": "#007cbf",
    },
  };

  const geolocateControlStyle = {
    left: 10,
    top: 10,
  };
  const [viewport, setViewport] = useState({
    latitude: 52.52,
    longitude: 13.405,
    zoom: 13,
  });
  const [tremoPoints, setTremoPoints] = useState();
  //const [showPopup, togglePopup] = React.useState(false);
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

  useEffect(() => {
    const unsubscribe = db
      .collection("tremos")
      .where("createdBy", "!=", user.uid)
      .onSnapshot((querySnapshot) => {
        const tremos = querySnapshot.docs.map((doc) => doc.data());
        setTremoPoints(tremos);
      });

    return () => unsubscribe();
  }, []);

  const [popupInfo, setPopupInfo] = useState(null);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        width="100vw"
        height="90vh"
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        {tremoPoints &&
          tremoPoints.map(tp => (
            <Marker
              latitude={tp.location.latitude}
              longitude={tp.location.longitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
            <img src={TremoFoundDiamond} alt="Neon Corcle" width="50px" />
            <img src={NeonCircle} alt="Neon Circle" width="150px" />
              {/* ❓ */}

              <Popup
                tipSize={5}
                anchor="top"
                latitude={tp.location.latitude}
                longitude={tp.location.longitude}
                offsetLeft={-15}
                offsetTop={10}
                closeOnClick={false}
                onClose={setPopupInfo}
              >
                <React.Fragment>
                  <div>Here we gooo!</div>
                  <InfoPopup />
                </React.Fragment>
              </Popup>
          ))
        {/*  <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source> */}
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
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
