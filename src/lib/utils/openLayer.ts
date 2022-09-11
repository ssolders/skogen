import {Circle as CircleStyle, Text, Fill, Stroke, Style} from 'ol/style';
import MultiPoint from 'ol/geom/MultiPoint';
import { transform, fromLonLat } from 'ol/proj';
import type { Area, AreaFeature } from '../types'
import { mapSettings, areas } from '../blyberg'
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import XYZ from 'ol/source/XYZ';

export const getAreaStyles = (feature: any) => {
  return  [
    new Style({
      stroke: new Stroke({
        color: 'blue',
        width: 2,
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0.1)',
      }),
      text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({ color: '#000' }),
        stroke: new Stroke({
          color: '#fff', width: 2
        }),
        text: feature.id_ // display the label of the area
      })
    }),
    new Style({
      image: new CircleStyle({
        radius: 3,
        fill: new Fill({
          color: 'green',
        }),
      }),
      geometry: function (feature) {
        // return the coordinates of the first ring of the polygon
        if (feature) {
          // @ts-ignore:
          const coordinates = feature.getGeometry()?.getCoordinates()[0];
          return new MultiPoint(coordinates);
        }
      },
    }),
  ];    
}

export const createAreaFeature = (area: Area): AreaFeature => {
  const areaPoints = area.points.map(point => point)
  return {
    'type': 'Feature',
    id: `${area.name} (${area.propertyId})`,
    'geometry': {
      'type': 'Polygon',
      'coordinates': [
        areaPoints.map(point => transform([point[1], point[0]], 'EPSG:4326', 'EPSG:3857'))
      ],
    },
  }
}

export const createOpenLayerMap = () => {
  const geojsonObject = {
    'type': 'FeatureCollection',
    'crs': {
      'type': 'name',
      'properties': {
        'name': 'EPSG:3857',
      },
    },
    'features': areas.map(createAreaFeature)
  };

  const source = new VectorSource({
    features: new GeoJSON().readFeatures(geojsonObject),
  });

  const layer = new VectorLayer({
    source: source,
    style: getAreaStyles,
  });

  new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new XYZ({
          url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        })
      }),
      layer,
    ],
    view: new View({
      center: fromLonLat([mapSettings.lon, mapSettings.lat]),  
      zoom: mapSettings.zoom
    })
  });
}