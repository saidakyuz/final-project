import React from "react";
// import * as React from 'react';
import { useState } from "react";
import ReactMapGL from "react-map-gl";
import { Container, Row, Col } from "react-bootstrap";

const Map = () => {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 52.52,
    longitude: 13.405,
    zoom: 13,
  });
  return (
    <Container style={{ width: "100%" }}>
      <Row>
        {" "}
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
        />
      </Row>
    </Container>
  );
};

export default Map;
