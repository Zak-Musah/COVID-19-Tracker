import { useEffect } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import L from "leaflet";
import "@asymmetrik/leaflet-d3";

export default function HexBin(props) {
  let coordinates;
  const { countryData } = props;
  const context = useLeafletContext();
  useEffect(() => {
    const layerContainer = context.layerContainer || context.map;
    const { data } = props;
    const points = data.features.filter(
      (feat) =>
        feat.hasOwnProperty("geometry") &&
        feat.geometry &&
        typeof feat.geometry === "object" &&
        feat.geometry.hasOwnProperty("type") &&
        feat.geometry.type === "Point",
    );
    coordinates = points.map((feat) => feat.geometry.coordinates);
    let layer = createLeafletElement();
    layer.data(coordinates);
    layerContainer.addLayer(layer);

    return () => {};
  }, []);
  const createLeafletElement = (props) => {
    return L.hexbinLayer(props)
      .hoverHandler(
        L.HexbinHoverHandler.tooltip({
          tooltipContent(d) {
            let values = [];
            let country = "";
            d.map((array1) => {
              Object.keys(countryData).map((key) => {
                if (countryData[key].includes(array1.o[0])) {
                  country = key;
                }
              });
            });
            // const average = (array) => array.reduce((a, b) => a + b) / array.length;
            // let averageValue = average(values);
            return country;
          },
        }),
      )
      .colorRange(["#008000", "#008000"])
      .colorValue(function (d) {
        return d.length;
      });
  };

  return null;
}
