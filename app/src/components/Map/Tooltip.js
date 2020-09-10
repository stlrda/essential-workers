import React from "react";
import './Tooltip.css';

const Tooltip = ({ feature }) => {
  const { layer } = feature;
  console.log(layer.id);

  const hidden = layer.id === "root-layer" ? false : true;

  return (
    <div className="tooltipz" hidden={hidden}>
        <div>County: {feature.properties.NAME}</div>
        <div>GDP: {feature.properties["GDP (Thousands of dollars)"]}</div>
        <div>Labor Force: {feature.properties["Labor Force"]}</div>
        <div>Unemployment: {feature.properties["Unemployment Rate"]}</div>
        <div>Median Income: {feature.properties["Median Income Essential Workers"]}</div>
        <div>Frontline Rate: {feature.properties["Frontline Industry Rate"]}</div>
    </div>
  );
};

export default Tooltip;