import * as React from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

const MapMarker = () => {
  const [viewport, setViewport] = React.useState({
    longitude: -122.45,
    latitude: 37.78,
    zoom: 14
  });
  return (
    <ReactMapGL {...viewport} width="100vw" height="100vh" onViewportChange={setViewport}>
      <Marker latitude={37.78} longitude={-122.41} offsetLeft={-20} offsetTop={-10}>
        <div>You are here</div>
      </Marker>
    </ReactMapGL>
  );
}

export default MapMarker;
