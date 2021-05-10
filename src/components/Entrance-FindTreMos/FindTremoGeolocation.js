import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  Popup,
  Layer
} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import * as turf from '@turf/turf'
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase/firebase";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import InfoPopup from "./InfoPopup";
import NeonCircle from "../../assets/blue-pink-neon-circle.png";

const FindTremoGeolocation = ({setActiveHunt}) => {
  const { user } = useContext(AuthContext);
  const [userLocation, setUserLocation] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTremo, setSelectedTremo] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 52.52,
    longitude: 13.405,
    zoom: 13,
  });
  const [tremoPoints, setTremoPoints] = useState();
  
  const geolocateControlStyle = {
    left: 10,
    top: 10,
  };
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
  
  const handleFindTremoClick = (tp) => {
    const distance = (lat1, lon1, lat2, lon2, unit) =>{
      if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
      }
      else {
        const radlat1 = Math.PI * lat1/180;
        const radlat2 = Math.PI * lat2/180;
        const theta = lon1-lon2;
        const radtheta = Math.PI * theta/180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
      }
    }
    const distanceFromTremo = distance(tp.location._lat, tp.location._long, userLocation.lat, userLocation.lng, 'K')
    if (distanceFromTremo >= 1){
      setSelectedTremo({...tp, distanceFromTremo })
      setShowPopup(true)
    } else {
      setSelectedTremo({...tp, distanceFromTremo })
      setShowPopup(true)
    }
  }

  const getUserCoordinatesAtTremo = (e) => {
    setUserLocation({ lat: e.coords.latitude, lng: e.coords.longitude });
  };

  const startNewHunt = ()=>{
    setActiveHunt(selectedTremo)
    setShowPopup(false)
  }


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
  

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        width="100vw"
        height="90vh"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        {tremoPoints &&
          tremoPoints.map((tp) => (
            <React.Fragment>
              <Marker
                key={tp.location.latitude + tp.location.longitude}
                latitude={tp.location.latitude}
                longitude={tp.location.longitude}
                offsetLeft={-20}
                offsetTop={-10}
                onClick={()=>handleFindTremoClick(tp)
                }
              >
                <img src={NeonCircle} alt="Neon Circle" width="150px" />
              </Marker>
            </React.Fragment>
          ))}
          {showPopup && (
                <Popup
                  tipSize={5}
                  anchor="top"
                  latitude={selectedTremo.location._lat}
                  longitude={selectedTremo.location._long}
                  offsetLeft={20}
                  offsetTop={10}
                  closeOnClick={false}
                  onClose={() => setShowPopup(false)}
                >
                  <React.Fragment>
                    {
                      selectedTremo.distanceFromTremo <= 1 ? (
                      <React.Fragment>
                        <h3 className='text-dark'>{selectedTremo.name} is only {selectedTremo.distanceFromTremo.toFixed(3)} km away</h3>
                      <button className='btn btn-dark btn-block' onClick={startNewHunt}>Yes, activate the Hunt!</button>
                      </React.Fragment>

                      ) : (<h3 className='text-dark'>You are to far away, come closer 😉</h3>)
                    }
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
          position="bottom-left"
        />
      </ReactMapGL>
    </div>
  );
};

export default FindTremoGeolocation;
