import L from 'leaflet';
import React from 'react';
import dataMap from '../public/static/map_data/new.json';
import Router from 'next/router';

const GeoMap = ({ geographyId }: { geographyId: number }): JSX.Element => {
  const mapRef = React.useRef<L.Map>();
  React.useEffect(() => {
    //layer style
    const layerStyle = {
      clickable: true,
      color: '#00d',
      fillColor: '#d5dbd6',
      weight: 1.0,
      opacity: 0.3,
      fillOpacity: 0.3
    };
    // hover style
    const hoverStyle = {
      fillColor: '#cf8f8f',
      fillOpacity: 0.7
    };
    //feature style
    const featureGeoStyle = {
      fillColor: '#cf8f8f',
      color: '#777',
      weight: 2,
      opacity: 0.3,
      fillOpacity: 0.5,
      clickable: false
    };

    mapRef.current = L.map('mapid', {
      scrollWheelZoom: false,
      zoomControl: true,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });
    mapRef.current.zoomControl.setPosition('topleft');
    const drawFeatures = (currentFeature: any): void => {
      // draw current feature
      if (currentFeature) {
        const layer = L.geoJSON(currentFeature as any, {
          style: featureGeoStyle
        });
        if (mapRef.current) {
          mapRef.current.addLayer(layer);
          mapRef.current.setView(layer.getBounds().getCenter(), 9);
        }
      }
    };
    // draw remaining features
    new L.GeoJSON(dataMap as any, {
      style: layerStyle,
      onEachFeature: (feature: any, layer: any): void => {
        layer.on('mouseover', function() {
          layer
            .setStyle(hoverStyle)
            .bindTooltip(
              `${feature.properties.pc_name}, ${feature.properties.st_name}(${feature.properties.pc_category})`,
              { direction: 'auto', sticky: true }
            )
            .openTooltip();
        });
        layer.on('mouseout', () => {
          layer.setStyle(layerStyle);
        });
        layer.on('click', () => {
          Router.push(
            '/geographies/[gid]',
            `/geographies/${feature.properties.pc_id}`
          );
        });
      }
    }).addTo(mapRef.current);

    // to get current feature's index
    const index = dataMap.features.findIndex(
      each => each.properties.pc_id === geographyId
    );
    const currentFeature = dataMap.features[index];

    drawFeatures(currentFeature);

    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  });

  return <div id="mapid" style={{ width: '100%', height: '500px' }} />;
};

export default GeoMap;
