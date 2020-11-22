import React, { useRef, useState, useEffect } from "react";
import styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Tooltip, CircleMarker } from "react-leaflet";

import HexBin from "./MapHexbins";
import { fetchLongLat } from "../../api";

function MapView({ dataAllCountries: { confirmed, recovered, deaths } }) {
  const map = useRef();
  const [data, setData] = useState({});
  const [countryData, setCountryData] = useState();
  console.log(confirmed);
  useEffect(() => {
    const fetchCoords = async () => {
      const countryDetails = await fetchLongLat();

      if (countryDetails) {
        let features = [];
        console.log(countryDetails);
        Object.keys(countryDetails).forEach((key, i) => {
          let lonlat = countryDetails[key];
          if (lonlat.includes(null)) {
            return;
          }
          setCountryData(countryDetails);
          features.push({
            type: "Feature",
            id: i,
            geometry: { type: "Point", coordinates: lonlat },
            properties: { OBJECTID: i },
          });
        });

        let hexBinObject = {
          type: "FeatureCollection",
          crs: { type: "name", properties: { name: "EPSG:4326" } },
          features,
        };
        setData(hexBinObject);
      }
    };

    fetchCoords();
  }, []);

  return (
    <div className={styles.map}>
      <MapContainer
        style={{ height: "100vh" }}
        ref={map}
        center={[0, 0]}
        zoom={2}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data && Object.keys(data).length > 0 && (
          <HexBin
            className="hexbin-tooltip"
            ref={(ref) => {
              L.HexbinLayer = ref;
            }}
            data={data}
            countryData={countryData}
          />
        )}
      </MapContainer>
    </div>
  );
}

export default MapView;
