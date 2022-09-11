import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { View } from 'ol';
import { fromLonLat } from 'ol/proj';
import { mapSettings } from '../lib/blyberg'

export const mapView: Writable<View> = writable(new View({
  center: fromLonLat([mapSettings.lon, mapSettings.lat]),  
  zoom: mapSettings.zoom
}))