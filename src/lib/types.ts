import type { Coordinate } from 'ol/coordinate'

export type MapSettings = {
  lon: number
  lat: number
  zoom: number
}

export type AreaFeature = {
  type: string
  id: string
  geometry: {
    type: 'Polygon'
    coordinates: Coordinate[][]
  }
}

export type Area = {
  name: string
  propertyId: string
  points: Coordinate[]
}