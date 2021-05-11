import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import ReactMapGL, { GeolocateControl, Marker, Popup, Layer } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import * as turf from '@turf/turf';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firebase/firebase';
import { distance } from '../../utils/utils';
import NeonCircle from '../../assets/blue-pink-neon-circle.png';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl from 'mapbox-gl'; // This is a dependency of react-map-gl even if you didn't explicitly install it
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const FindTremoGeolocation = ({ setActiveHunt }) => {
  const { user, userLocation, setUserLocation } = useContext(AuthContext);
  const [tremosInChest, setTremosInChest] = useState()
  const [tremosByOtherUsers, setTremosByOtherUsers] = useState()
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTremo, setSelectedTremo] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 52.52,
    longitude: 13.405,
    zoom: 13
  });
  const [tremoPoints, setTremoPoints] = useState();

  const geolocateControlStyle = {
    left: 20,
    top: 10
  };

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

  const handleFindTremoClick = tp => {
    const distanceFromTremo = distance(
      tp.location._lat,
      tp.location._long,
      userLocation.lat,
      userLocation.lng,
      'K'
    );
    if (distanceFromTremo >= 1) {
      setSelectedTremo({ ...tp, distanceFromTremo });
      setShowPopup(true);
    } else {
      setSelectedTremo({ ...tp, distanceFromTremo });
      setShowPopup(true);
    }
  };

  const getUserCoordinatesAtTremo = e => {
    setUserLocation({ lat: e.coords.latitude, lng: e.coords.longitude });
  };

  const startNewHunt = () => {
    setActiveHunt(selectedTremo);
    setShowPopup(false);
  };

  useEffect(() => {

    const chestUnsubscribe = db
    .collection('chest')
    .where('user_id', '==', user.uid)
    .onSnapshot(querySnapshot => {
      const tremos = querySnapshot.docs.map(doc => doc.data());
      setTremosInChest(tremos)
    });

    const unsubscribe = db
      .collection('tremos')
      .where('createdBy', '!=', user.uid)
      .onSnapshot(querySnapshot => {
        const tremos = querySnapshot.docs.map(doc => doc.data());
        setTremosByOtherUsers(tremos)
      });

    return () => {
      chestUnsubscribe()
      unsubscribe()
    };
  }, []);

  useEffect(()=>{
    if(tremosByOtherUsers && tremosInChest){
      const tremosToFind = tremosByOtherUsers.filter(tp => !tremosInChest.find(tic => tic.name ===tp.name) && tp )
      setTremoPoints(tremosToFind)
    }
  },[tremosInChest, tremosByOtherUsers])

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        width='100vw'
        height='90vh'
        mapStyle='mapbox://styles/mapbox/dark-v9'
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        {tremoPoints &&
          tremoPoints.map(tp => (
            <Layer
              onMouseEnter={() => handleFindTremoClick(tp)}
              key={`${tp.name}-${tp.location._lat}-${tp.location._long}`}
              id={tp.name}
              type='fill'
              source={{
                type: 'geojson',
                data: turf.circle(
                  turf.point([tp.location._long, tp.location._lat]),
                  tp.radius || 50,
                  {
                    steps: 80,
                    units: 'meters'
                  }
                )
              }}
              paint={{
                'fill-color': 'purple',
                'fill-opacity': 0.6
              }}
            />
          ))}
        {tremoPoints &&
          tremoPoints.map(tp => (
            <React.Fragment>
              <Marker
                key={tp.location.latitude + tp.location.longitude}
                latitude={tp.location.latitude}
                longitude={tp.location.longitude}
                onClick={() => handleFindTremoClick(tp)}
              >
                <img
                  src={NeonCircle}
                  alt='Neon Circle'
                  width='150px'
                  style={{ transform: 'translate(-50%, -50%)' }}
                />
              </Marker>
            </React.Fragment>
          ))}
        {showPopup && (
          <Popup
            tipSize={5}
            anchor='top'
            latitude={selectedTremo.location._lat}
            longitude={selectedTremo.location._long}
            offsetLeft={20}
            offsetTop={10}
            closeOnClick={false}
            onClose={() => setShowPopup(false)}
          >
            <React.Fragment>
              {selectedTremo.distanceFromTremo <= 1 ? (
                <React.Fragment>
                  <h3 className='text-dark'>
                    {selectedTremo.name} is only {selectedTremo.distanceFromTremo.toFixed(3)} km
                    away
                  </h3>
                  <button className='btn btn-dark btn-block' onClick={startNewHunt}>
                    Yes, activate the Hunt!
                  </button>
                </React.Fragment>
              ) : (
                <h3 className='text-dark'>You are to far away, come closer 😉</h3>
              )}
            </React.Fragment>
          </Popup>
        )}
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          auto
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onGeolocate={getUserCoordinatesAtTremo}
        />
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
