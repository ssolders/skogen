import {Circle as CircleStyle, Text, Fill, Stroke, Style} from 'ol/style';
import MultiPoint from 'ol/geom/MultiPoint';
import Point from 'ol/geom/Point';
import Geolocation from 'ol/Geolocation';
import Feature from 'ol/Feature';
import { transform, fromLonLat } from 'ol/proj';
import type { Area, AreaFeature } from '../types'
import { mapSettings, areas } from '../blyberg'
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import XYZ from 'ol/source/XYZ';

const skogenView = new View({
  center: fromLonLat([mapSettings.lon, mapSettings.lat]),  
  zoom: mapSettings.zoom
})

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

const createGeoLocation = () => {
  var geolocation = new Geolocation({
    // enableHighAccuracy must be set to true to have the heading value.
    trackingOptions: {
      enableHighAccuracy: true
    },
    projection: skogenView.getProjection()
  });

  function el(id: string) {
    return document.getElementById(id);
  }

  const element = el('track') as HTMLInputElement;
  if (element) {
    element.addEventListener('change', function() {
      geolocation.setTracking(this.checked);
    });

    // update the HTML page when the position changes.
      geolocation.on('change', function() {
        const infoElement = el('positionshowingtouser1') as HTMLDivElement;
        if (infoElement) {
          infoElement.innerText = JSON.stringify(geolocation.getPosition());
            // el('accuracy').innerText = geolocation.getAccuracy() + ' [m]';
            // el('altitude').innerText = geolocation.getAltitude() + ' [m]';
            // el('altitudeAccuracy').innerText = geolocation.getAltitudeAccuracy() + ' [m]';
            // el('heading').innerText = geolocation.getHeading() + ' [rad]';
            // el('speed').innerText = geolocation.getSpeed() + ' [m/s]';
        }
      });
    }

    // handle geolocation error.
    geolocation.on('error', function(error) {
      var info = document.getElementById('info');
      console.error(info, error);
      if (info && error) {
        // info.innerHTML = error.message;
        // info.style.display = '';
      }
    });

    var accuracyFeature = new Feature();
      geolocation.on('change:accuracyGeometry', function() {
        // @ts-ignore:
        accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
      });

      var positionFeature = new Feature();
      positionFeature.setStyle(new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: '#3399CC'
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2
          })
        })
      }));

      geolocation.on('change:position', function() {
        var coordinates = geolocation.getPosition();
        // @ts-ignore:
        positionFeature.setGeometry(coordinates ?
          new Point(coordinates) : null);
      });

    return {
      positionFeature,
      accuracyFeature
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


  const { accuracyFeature, positionFeature } = createGeoLocation();
  const source = new VectorSource({
    features: [
      ...new GeoJSON().readFeatures(geojsonObject),
      accuracyFeature,
      positionFeature
    ],
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
    view: skogenView
  });
}