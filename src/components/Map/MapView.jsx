import React, { useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";

function MapView() {
  const map = useRef();

  return (
    <div className={styles.map}>
      <MapContainer
        style={{ height: "100vh" }}
        ref={map}
        center={[51.406502, 12.422398]}
        zoom={15}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}

export default MapView;
