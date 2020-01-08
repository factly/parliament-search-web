import React from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import Router from 'next/router';
import PropTypes from 'prop-types';
import dataMap from '../public/static/map_data/new.json';

const GeographyMap = ({ geographyId }: { geographyId: number }) => {
  let center: number[] = [];
  let zoom = 8;
  const index = dataMap.features.findIndex(
    each => each.properties.pc_id === geographyId
  );
  if (index >= 0) {
    const { coordinates } = dataMap.features[index].geometry;
    const latitudes: number[] = [];
    const longitutdes: number[] = [];
    coordinates.map(each =>
      each.map(each1 => each1.map(each2 => latitudes.push(each2[0])))
    );
    coordinates.map(each =>
      each.map(each1 => each1.map(each2 => longitutdes.push(each2[1])))
    );
    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitutdes);
    const maxLng = Math.max(...longitutdes);
    // center
    center = [(minLng + maxLng) / 2, (minLat + maxLat) / 2];
    const a =
      maxLat - minLat > maxLng - minLng ? maxLat - minLat : maxLng - minLng;
    zoom = a > 3 ? 7 : a > 1 ? 8 : 9.5;
  }
  const [hover, setHover] = React.useState(geographyId);

  const onEachFeature = (feature: any, layer: any) => {
    const click = () =>
      Router.push(
        '/geographies/[gid]',
        `/geographies/${feature.properties.pc_id}`
      );

    const mouseOver = () => {
      setHover(feature.properties.pc_id);
      layer.setStyle({
        fillColor: '#cf8f8f'
      });
      layer
        .bindTooltip(
          `${feature.properties.pc_name}, ${feature.properties.st_name}(${feature.properties.pc_category})`,
          { direction: 'auto', sticky: true }
        )
        .openTooltip();
    };
    const mouseOut = () => {
      layer.setStyle({
        fillColor: '#d5dbd6'
      });
    };
    layer.on({
      click,
      mouseover: mouseOver,
      mouseout: mouseOut
    });
  };

  const geoJSONStyle = (feature: any) => ({
    color: '#1f2021',
    weight: 1,
    fillOpacity: 0.5,
    fillColor: feature.properties.pc_id === geographyId ? '#cf8f8f' : '#d5dbd6',
    zIndex: 0
  });

  return (
    <Map
      center={center as any}
      zoom={zoom}
      style={{ height: 500 }}
      scrollWheelZoom={false}
      maxZoom={18}
      minZoom={4}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        data={dataMap as any}
        style={geoJSONStyle}
        onEachFeature={onEachFeature}
      />
    </Map>
  );
};
GeographyMap.propTypes = {
  geographyId: PropTypes.number.isRequired
};
export default GeographyMap;
