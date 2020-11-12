import React, { useRef, useState, useEffect } from "react";
import { fetchDailyData, fetchLongLat } from "../../api";
import { MapContainer, TileLayer } from "react-leaflet";
import HexBin from "./MapHexbins";
import styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
function MapView() {
  const map = useRef();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchCoords = async () => {
      let countryDetails = await fetchLongLat();
      if (countryDetails) {
        let features = [];
        Object.keys(countryDetails).forEach((key, i) => {
          let lonlat = countryDetails[key];
          console.log(lonlat);
          if (lonlat.includes(null)) {
            return;
          }
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
  console.log(data);

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
        {data && Object.keys(data).length > 0 && (
          <HexBin
            className="hexbin-tooltip"
            ref={(ref) => {
              L.HexbinLayer = ref;
            }}
            data={data}
            // {...options}
          />
        )}
      </MapContainer>
    </div>
  );
}

export default MapView;
