import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ApiRateItem {
  date: string;
  base: string;
  quote: string;
  rate: number;
}

export const currencyApi = createApi({
  reducerPath: "currencyApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.frankfurter.dev/v2/" }),
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

    getChartRates: builder.query<
      { date: string; rate: number }[],
      { base: string; quote: string; days: number }
    >({
      query: ({ base, quote, days }) => {
        const endDate = new Date().toISOString().split("T")[0];
        const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0];
        return `rates?from=${startDate}&to=${endDate}&base=${base.toLowerCase()}&quotes=${quote.toLowerCase()}`;
      },
      transformResponse: (response: ApiRateItem[], _, arg) => {
        return response
          .filter(
            (item) => item.quote.toUpperCase() === arg.quote.toUpperCase(),
          )
          .map((item) => ({
            date: new Date(item.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            }),

            rate: item.rate,
          }));
      },
    }),
  }),
});

export const { useGetLiveRatesQuery, useGetChartRatesQuery } = currencyApi;
