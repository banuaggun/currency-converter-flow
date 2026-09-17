import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ApiRateItem {
  date: string;
  base: string;
  quote: string;
  rate: number;
}

export const currencyApi = createApi({
  reducerPath: 'currencyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.frankfurter.dev/v2/' }),
  endpoints: (builder) => ({
    getLiveRates: builder.query<{ [key: string]: number }, string>({

        query: (baseCurrency) => `rates?base=${baseCurrency.toLowerCase()}`,
      
      transformResponse: (response: ApiRateItem[]) => {
        const transformed: { [key: string]: number } = {};
        
        response.forEach((item) => {
          transformed[item.quote.toUpperCase()] = item.rate;
        });
        
        return transformed; 
      },
    }),
  }),
});

export const { useGetLiveRatesQuery } = currencyApi;
