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
  Source,
  Layer,
  Popup,
} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase/firebase";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import reactDom from "react-dom";
import InfoPopup from "./InfoPopup";
import NeonCircle from "../../assets/blue-pink-neon-circle.png";

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

  const [myKey, setMyKey] = useState();
  const [showPopup, setShowPopup] = useState(false);

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
                key={tp.location.latitude + tp.location.longitude} // it's temporary variable. When we have a key on db it will be changed
                latitude={tp.location.latitude}
                longitude={tp.location.longitude}
                offsetLeft={-20}
                offsetTop={-10}
                onClick={() =>
                  setMyKey(tp.location.latitude + tp.location.longitude)
                }
              >
                <img src={NeonCircle} alt="Neon Circle" width="150px" />
              </Marker>
              {myKey == tp.location.latitude + tp.location.longitude && (
                <Popup
                  tipSize={5}
                  anchor="top"
                  latitude={tp.location.latitude}
                  longitude={tp.location.longitude}
                  offsetLeft={-15}
                  offsetTop={10}
                  closeOnClick={false}
                  onClose={() => setMyKey(null)}
                >
                  <React.Fragment>
                    <div>Here we gooo!</div>
                    <InfoPopup tp={tp} />
                  </React.Fragment>
                </Popup>
              )}
            </React.Fragment>
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
