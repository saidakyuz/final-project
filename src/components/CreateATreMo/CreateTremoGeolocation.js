import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import ReactMapGL, { GeolocateControl, Popup, Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl'; // This is a dependency of react-map-gl even if you didn't explicitly install it
import { AuthContext } from '../../context/AuthContext';
import { db, storage, GeoPoint } from '../../firebase/firebase';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import TremoFoundDiamond from '../../assets/lilaSpitzerDiamant.png';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const CreateTremoGeolocation = () => {
  const { user } = useContext(AuthContext);
  const geolocateControlStyle = {
    left: 10,
    top: 10
  };
  const [viewport, setViewport] = useState({
    latitude: 52.52,
    longitude: 13.405,
    zoom: 13
  });
  const [newTremoForm, setNewTremoForm] = useState({
    name: '',
    hint: '',
    radius: ''
  });
  const fileRef = useRef();
  const [selectedFile, setSelectedFile] = useState();
  const [myTremos, setMyTremos] = useState();
  const [userLocation, setUserLocation] = useState();
  const [newTremoCoordinates, setNewTremoCoordinates] = useState();
  const mapRef = useRef();
  const handleViewportChange = useCallback(newViewport => setViewport(newViewport), []);

  const getUserCoordinatesAtTremo = e => {
    setUserLocation({ lat: e.coords.latitude, lng: e.coords.longitude });
  };

  const getNewTremoLocation = e => {
    setNewTremoCoordinates({ lat: e.lngLat[1], lng: e.lngLat[0] });
  };

  const onChange = e => setNewTremoForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const setFile = e => {
    setSelectedFile(e.target.files[0]);
  };

  const handleTremoCreation = e => {
    e.preventDefault();
    const newTremo = db.collection('tremos').doc();
    const location = new GeoPoint(newTremoCoordinates.lat, newTremoCoordinates.lng);

    const storageRef = storage.ref();
    const tremoImg = storageRef.child(`tremo-id-${Date.now()}.jpg`);
    tremoImg.put(selectedFile).then(snapshot =>
      snapshot.ref.getDownloadURL().then(downloadURL => {
        newTremo.set({
          ...newTremoForm,
          location,
          createdBy: user.uid,
          picture: downloadURL
        });
      })
    );
    setNewTremoForm({
      name: '',
      hint: '',
      radius: ''
    });
    fileRef.current.value = '';
    setNewTremoCoordinates();
  };

  useEffect(() => {
    const unsubscribe = db
      .collection('tremos')
      .where('createdBy', '==', user.uid)
      .onSnapshot(querySnapshot => {
        const tremos = querySnapshot.docs.map(doc => doc.data());
        setMyTremos(tremos);
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
        mapStyle='mapbox://styles/mapbox/dark-v9'
        onViewportChange={setViewport}
        //onClick={getCoordinates}
        onClick={getNewTremoLocation}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        {myTremos &&
          myTremos.map(t => (
            <Marker
              latitude={t.location.latitude}
              longitude={t.location.longitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <img src={TremoFoundDiamond} alt='Neon Circle' width='50px' />
            </Marker>
          ))}
        {newTremoCoordinates && (
          <Popup
            latitude={newTremoCoordinates.lat}
            longitude={newTremoCoordinates.lng}
            closeOnClick={false}
            onClose={() => setNewTremoCoordinates()}
          >
            <form onSubmit={handleTremoCreation}>
              <div className='form-group'>
                <input
                  type='file'
                  name='tremoImg'
                  accept='image/png, image/jpeg'
                  ref={fileRef}
                  onChange={setFile}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1'>Tremo name</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Name your tremo'
                  name='name'
                  value={newTremoForm.name}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1'>Hint</label>
                <textarea
                  className='form-control'
                  placeholder='Hint'
                  name='hint'
                  value={newTremoForm.hint}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='customRange1' class='form-label'>
                  Radius
                </label>
                <input
                  type='range'
                  class='form-range'
                  id='customRange1'
                  name='radius'
                  value={newTremoForm.radius}
                  onChange={onChange}
                />
              </div>
              <button type='submit' className='btn btn-dark btn-block'>
                Submit
              </button>
            </form>
          </Popup>
        )}
        <GeolocateControl
          // onGeolocate={getUserLocation}
          onGeolocate={getUserCoordinatesAtTremo}
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
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
