import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ApiRateRow {
  date: string;
  base: string;
  quote: string;
  rate: number;
} 


export const pairsApi = createApi({
  reducerPath: "pairsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.frankfurter.dev/v2/" }),
  endpoints: (builder) => ({
    getMarketSnapshot: builder.query<{ [key: string]: number }, string | void>({
      query: (dateParam) => dateParam ? `rates?date=${dateParam}` : "rates",
      
      transformResponse: (response: ApiRateRow[]) => {
        const transformed: { [key: string]: number } = {};
        
        if (Array.isArray(response)) {
          response.forEach((item) => {
            const pairKey = `${item.base.toUpperCase()}_${item.quote.toUpperCase()}`;
            transformed[pairKey] = item.rate;
          });
        }
        
        return transformed;
      },
    }), 


 getLatestDate: builder.query<string, void>({
      query: () => "rates",
      transformResponse: (response: ApiRateRow[]) => {
        return response.length > 0 ? response[0].date : new Date().toISOString().split('T')[0];
      }
    })

  }),
});

export const { useGetMarketSnapshotQuery, useGetLatestDateQuery  } = pairsApi;
