import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import ReactMapGL, { GeolocateControl, Popup, Marker } from 'react-map-gl';
import { AuthContext } from '../../context/AuthContext';
import { db, storage, GeoPoint } from '../../firebase/firebase';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';

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
  const mapRef = useRef();
  const handleViewportChange = useCallback(newViewport => setViewport(newViewport), []);
  const [newTremoForm, setNewTremoForm] = useState({
    name: '',
    hint: '',
    radius: ''
  });
  const [selectedFile, setSelectedFile] = useState();
  const [myTremos, setMyTremos] = useState();
  const [userLocation, setUserLocation] = useState();
  const [newTremoCoordinates, setNewTremoCoordinates] = useState();

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

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        width='100vw'
        height='90vh'
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
              💎
            </Marker>
          ))}
        {newTremoCoordinates && (
          <Popup latitude={newTremoCoordinates.lat} longitude={newTremoCoordinates.lng}>
            <form onSubmit={handleTremoCreation}>
              <div className='form-group'>
                <input
                  type='file'
                  name='tremoImg'
                  accept='image/png, image/jpeg'
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
              <button type='submit' className='btn btn-primary'>
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
