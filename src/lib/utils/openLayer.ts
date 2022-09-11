import {Circle as CircleStyle, Text, Fill, Stroke, Style} from 'ol/style';
import { LineString, MultiPoint, Point } from 'ol/geom';
import { Feature, Geolocation, Map, Overlay, View } from 'ol';
import { transform, fromLonLat } from 'ol/proj';
import { Tile, Vector } from 'ol/layer';
import { Vector as VectorSource, XYZ } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import type { Area, AreaFeature } from '../types'
import { mapSettings, areas } from '../blyberg'
import { mapView } from '../../stores/context';
import { get } from 'svelte/store';

let positionInitiated = false;
const contextMapView = get(mapView);

const getAreaStyles = (feature: any) => {
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

const createAreaFeature = (area: Area): AreaFeature => {
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

const enableGeoLocation = (map: Map, trackFeature: any) => {
  var geolocation = new Geolocation({
    tracking: true,
    trackingOptions: {
      enableHighAccuracy: true
    }
  });
  
  // bind the view's projection
  geolocation.setProjection(contextMapView.getProjection());
  // when we get a position update, add the coordinate to the track's
  // Only center the view the first time

  geolocation.on('change:position', function() {
    var coordinates = geolocation.getPosition();

    if(!positionInitiated) {
      contextMapView.setCenter(coordinates);
      positionInitiated = true;
    }

    trackFeature.setGeometry(coordinates ? new Point(coordinates) : null);
  });

  // put a marker at our current position
  const locationElement = document.getElementById('location') as HTMLDivElement;
  if (locationElement) {
    var marker = new Overlay({
      element: locationElement,
      positioning: 'center-center'
    });
    map.addOverlay(marker);

    console.log('MARKER POS: ', geolocation.getPosition())
    marker.setPosition(geolocation.getPosition())
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

  // use a single feature with a linestring geometry to display our track
  const trackFeature = new Feature({
    geometry: new LineString([])
  });

  trackFeature.setStyle(new Style({
    image: new CircleStyle({
      radius: 8,
      fill: new Fill({
        color: '#3399CC'
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 3
      })
    })
  }));

  const source = new VectorSource({
    features: [
      ...new GeoJSON().readFeatures(geojsonObject),
      trackFeature
    ],
  });

  const layer = new Vector({
    source: source,
    style: getAreaStyles,
  });

  const map = new Map({
    target: 'map',
    layers: [
      new Tile({
        source: new XYZ({
          url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        })
      }),
      layer,
    ],
    view: contextMapView
  });

  enableGeoLocation(map, trackFeature)
}

