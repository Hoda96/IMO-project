import { mapStylesSourcesType } from "../../shared/type";

export const mapStylesSources: mapStylesSourcesType[]
 = [
    {
      source: 'mapir-xyz-style',
      type: 'vector',
      labelID: 'گنجشک'
    },
    {
      source: 'mapir-style-dark',
      type: 'vector',
      labelID: 'کلاغ',
    },
    {
      source: 'mapir-xyz-light-style',
      type: 'vector',
      labelID:'پرستو'
    },
    {
      source: 'google-satellite',
      type: 'raster',
      labelID: 'ماهواره‌ای گوگل',
    },
    {
      source: 'google-satellite-label',
      type: 'raster',
      labelID: 'ماهواره‌ای گوگل با برچسب'
    },
    {
      source: 'osm-raster',
      type: 'raster',
      labelID:'OSM'
    },
  ];
  