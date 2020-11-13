import { useEffect } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import L from "leaflet";
import "@asymmetrik/leaflet-d3";

export default function HexBin(props) {
  let coordinates;
  const { country } = props;
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
            return "Geospatial clustering analytics coming soon !!";
          },
        }),
      )
      .colorRange(["#008000", "#008000"]);
  };

  return null;
}
