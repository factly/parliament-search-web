import React from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import Router from 'next/router';
import PropTypes from 'prop-types';
import dataMap from '../static/map_data/pc.json';

const ConstituencyMap = ({ constituencyId }) => {
  let center = [];
  let zoom = 8;
  const index = dataMap.features.findIndex((each) => each.properties.pc_id === constituencyId);
  if (index >= 0) {
    const { coordinates } = dataMap.features[index].geometry;
    const latitudes = [];
    const longitutdes = [];
    coordinates.map((each) => each.map((each1) => each1.map((each2) => latitudes.push(each2[0]))));
    coordinates.map((each) => each.map((each1) => each1.map((each2) => longitutdes.push(each2[1]))));
    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitutdes);
    const maxLng = Math.max(...longitutdes);
    // center
    center = [(minLng + maxLng) / 2, (minLat + maxLat) / 2];
    const a = (maxLat - minLat) > maxLng - minLng ? maxLat - minLat : maxLng - minLng;
    zoom = a > 3 ? 7 : a > 1 ? 8 : 9.5;
  }
  const [hover, setHover] = React.useState(constituencyId);

  const onEachFeature = (feature, layer) => {
    const click = () => Router.push('/constituencies/[cid]', `/constituencies/${feature.properties.pc_id}`);

    const mouseOver = () => {
      setHover(feature.properties.pc_id);
      layer.bindTooltip(`${feature.properties.pc_name}, ${feature.properties.st_name}(${feature.properties.pc_category})`, { direction: 'auto', sticky: true }).openTooltip();
    };
    layer.on({
      click,
      mouseover: mouseOver,
    });
  };

  const geoJSONStyle = (feature) => ({
    color: '#1f2021',
    weight: 1,
    fillOpacity: 0.5,
    fillColor: feature.properties.pc_id === constituencyId || feature.properties.pc_id === hover ? '#cf8f8f' : '#d5dbd6',
    zIndex: 0,
  });


  return (
    <Map center={center} zoom={zoom} style={{ height: 500 }} scrollWheelZoom={false} maxZoom={18} minZoom={4}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        data={dataMap}
        style={geoJSONStyle}
        onEachFeature={onEachFeature}
      />
    </Map>
  );
};
ConstituencyMap.propTypes = {
  constituencyId: PropTypes.number.isRequired,
};
export default ConstituencyMap;
