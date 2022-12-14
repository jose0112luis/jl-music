import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',  // nombre de la ruta reductora
  baseQuery: fetchBaseQuery({  // consulta base 
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',  // ruta base
    prepareHeaders: ( headers ) => {  // retorna una función q tiene parametro headers - preparará los encabezados
      headers.set('X-RapidAPI-Key', import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY); // agrega un encabezado con su valor
      return headers;  // prepareHeaders debe siemrpe retornar los encabezados
    },
  }),
  endpoints: ( builder ) => ({  // retorna una función q tiene parametro builder - construye los endpoints de la API q queremos llamar
    getTopCharts: builder.query({ query: () => '/charts/world' }),  // consulta para los Top Charts - crea la ruta - query retorna una función
    getSongsByGenre: builder.query({ query: (genre) => `/charts/genre-world?genre_code=${genre}`}),   // consulta las canciones por género - para el select de Discover
    getSongDetails: builder.query({ query: ({ songid }) => `/tracks/details?track_id=${ songid }` }),   // consulta para el detalla de una canción - busca por id de la canción
    getSongRelated: builder.query({ query: ({ songid }) => `/tracks/related?track_id=${ songid }` }),   // consulta canciones relacionadas a una canción - busca por id de la canción
    getArtistDetails: builder.query({ query: ({ artistId }) => `/artists/details?artist_id=${artistId}` }),   // consulta el detalle del artista
    getSongsByCountry: builder.query({ query: (countryCode) => `/charts/country?country_code=${countryCode}`}),   // consulta las canciones por el país - TODO error: net::ERR_BLOCKED_BY_CLIENT
    getSongsBySearch: builder.query({ query: (searchTerm) => `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}` }),
  }),
});

// redux permite llamar al endpoint como un Hook de la siguiente manera
export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
} = shazamCoreApi;