import type { Area, MapSettings } from './types'

export const mapSettings: MapSettings = {
  lon: 14.208857818907179,
  lat: 61.14791171397761, 
  zoom: 14
}

// Coordinates taken from Lantmäteriet. Manually selected each of the area points.
// Took the coordinates (e.g 61°8'11.5"N 14°13'29.6"E). Pasted into google maps search and
// took the coordinates presented in the format 61.136528, 14.224889
export const areas: Area[] = [
  {
    name: "Åsbäcksvägen",
    propertyId: "24:8",
    points: [
      [ 61.135417, 14.220417 ],
      [ 61.138861, 14.216667 ],
      [ 61.139972, 14.221333 ],
      [ 61.140833, 14.220417 ],
      [ 61.148083, 14.249750 ],
      [ 61.144417, 14.253583 ],
      [ 61.143333, 14.249167 ],
      [ 61.143389, 14.233944 ],
      [ 61.140444, 14.237472 ],
      [ 61.137194, 14.224250 ],
      [ 61.136528, 14.224889 ],
    ]
  },
  {
    name: "Stenänget",
    propertyId: "24:3",
    points: [
      [ 61.161250, 14.222556 ],
      [ 61.164167, 14.218750 ],
      [ 61.165806, 14.225028 ],
      [ 61.165306, 14.228278 ],
    ]
  },
  {
    name: "Oxbergsbron",
    propertyId: "24:3",
    points: [
      [ 61.133889, 14.171556 ],
      [ 61.133472, 14.171667 ],
      [ 61.132972, 14.174278 ],
      [ 61.139083, 14.199472 ],
      [ 61.140583, 14.195417 ],
      [ 61.140944, 14.193806 ],
      [ 61.140361, 14.194889 ],
      [ 61.139861, 14.195417 ],
      [ 61.139167, 14.195444 ],
      [ 61.138528, 14.194861 ],
      [ 61.139306, 14.193583 ],
    ]
  }

]