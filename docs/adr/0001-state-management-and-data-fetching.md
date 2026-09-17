# 1. State Management and Data Fetching via RTK Query

## Date

2026-09-17

## Status

Accepted

## Context

The application fetches live foreign exchange rates from the Frankfurter v2 API and synchronizes user inputs (amount, currency selections) across multiple components. Initially, local React state (`useState`) and asynchronous Thunks (`createAsyncThunk`) were considered. However, a clear technical need emerged to optimize data caching, automatic loading states, and to significantly reduce code complexity.

## Decision

We decided to adopt **Redux Toolkit Query (RTK Query)** as the core architecture for data fetching and global state management.

The key motivations behind this decision are:

1. **Data Caching:** To prevent duplicate network requests when a user switches back to a previously selected base currency, thereby saving bandwidth and optimizing API quotas.
2. **Declarative Data Management:** Replacing boilerplate reducers with RTK Query's auto-generated hooks, allowing seamless, single-line management of `isLoading` and `error` states.
3. **Response Manipulation:** Capturing the Frankfurter v2 API's array response structure and flattening it into a high-performance key-value object model via `transformResponse` before it reaches the UI components.

## Consequences

- The `currencySlice` has been decoupled from async logic, leaving it lightweight and strictly focused on local user inputs (amounts and dropdown selections).
- Manual `fetch` operations and complex `useEffect` dependency side-effects have been completely removed.
- Network transactions are heavily optimized, updating state efficiently during browser reloads or currency swaps.
