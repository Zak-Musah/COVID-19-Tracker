import { useEffect } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import L from "leaflet";
import "@asymmetrik/leaflet-d3";

export default function HexBin(props) {
  console.log(props);
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
    const coordinates = points.map((feat) => feat.geometry.coordinates);
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
            console.log(d);
            return "Count: " + d.length;
          },
        }),
      )
      .colorRange(["#008000", "#FF0000"]);
  };

  return null;
}
