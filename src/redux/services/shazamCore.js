import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',  // nombre de la ruta reductora
  baseQuery: fetchBaseQuery({  // consulta base 
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',  // ruta base
    prepareHeaders: ( headers ) => {  // retorna una función q tiene parametro headers - preparará los encabezados
      headers.set('X-RapidAPI-Key', '70dd3c8862mshd81c9af6d5f6c0dp147e9ajsn27a457675e62'); // agrega un encabezado con su valor
      return headers;  // prepareHeaders debe siemrpe retornar los encabezados
    },
  }),
  endpoints: ( builder ) => ({  // retorna una función q tiene parametro builder - construye los endpoints de la API q queremos llamar
    // consulta para los Top Charts - crea la ruta
    getTopCharts: builder.query({ query: () => '/charts/world' }),  // query retorna una función
  }),
});

// redux permite llamar al endpoint como un Hook de la siguiente manera
export const {
  useGetTopChartsQuery,
} = shazamCoreApi;