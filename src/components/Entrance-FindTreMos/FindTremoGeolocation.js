import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import ReactMapGL, { GeolocateControl, Marker, Source, Layer, Popup } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firebase/firebase';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';

const FindTremoGeolocation = () => {
  const { user } = useContext(AuthContext);
  const geojson = {
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', geometry: { type: 'Point', coordinates: [13.375165166, 52.509831294] } }
    ]
  };

  const circleRadius = 50;

  const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
      'circle-radius': circleRadius,
      'circle-opacity': 0.5,
      'circle-color': '#007cbf'
    }
  };

  const geolocateControlStyle = {
    left: 10,
    top: 10
  };
  const [viewport, setViewport] = useState({
    latitude: 52.52,
    longitude: 13.405,
    zoom: 13
  });
  const [tremoPoints, setTremoPoints] = useState();
  //const [showPopup, togglePopup] = React.useState(false);
  const mapRef = useRef();

  const handleViewportChange = useCallback(newViewport => setViewport(newViewport), []);

  const handleGeocoderViewportChange = useCallback(
    newViewport => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    [handleViewportChange]
  );

  useEffect(() => {
    const unsubscribe = db
      .collection('tremos')
      .where('createdBy', '!=', user.uid)
      .onSnapshot(querySnapshot => {
        const tremos = querySnapshot.docs.map(doc => doc.data());
        setTremoPoints(tremos);
      });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        width='100vw'
        height='90vh'
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
              ❓
              {/* <div className="marker" onClick={() => openPopup(index)}>
              <span><b>{index + 1}</b></span>
              </div> */}
            </Marker>
          ))}
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

          {/* {showPopup && 
          showPopup.map(sp => (
          <Popup
          latitude={sp.location.latitude}
          longitude={sp.location.longitude}
          closeButton={true}
          closeOnClick={false}
          onClose={() => togglePopup(false)}
          anchor="top" >
          <div>You are here</div>
          </Popup>
          ))} */}

        <Geocoder
          mapRef={mapRef}
          style={geolocateControlStyle}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          position='bottom-left'
        />

      </ReactMapGL>
    </div>
  );
};

export default FindTremoGeolocation;
