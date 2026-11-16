import {
  useGetMarketSnapshotQuery,
  useGetLatestDateQuery,
} from "../../store/pairsApi";
import { Message } from "../ui/messages/Message";
import "./currency-pairs.css";

interface SnapshotPair {
  base: string;
  quote: string;
}

export function CurrencyPairs() {
  const {
    data: todayRates,
    isLoading: isTodayLoading,
    error: todayError,
    refetch,
  } = useGetMarketSnapshotQuery();

  const { data: latestApiDate } = useGetLatestDateQuery();

  const getYesterdayDateString = (): string => {
    const d = new Date();
    const dayOfWeek = d.getDay();
    const offset = dayOfWeek === 1 ? 3 : 1;
    d.setDate(d.getDate() - offset);
    return d.toISOString().split("T")[0];
  };

  const { data: yesterdayRates, isLoading: isYesterdayLoading } =
    useGetMarketSnapshotQuery(getYesterdayDateString());

  const marketSnapshotPairs: SnapshotPair[] = [
    { base: "EUR", quote: "USD" },
    { base: "USD", quote: "JPY" },
    { base: "GBP", quote: "USD" },
    { base: "USD", quote: "CHF" },
    { base: "AUD", quote: "USD" },
    { base: "USD", quote: "CAD" },
    { base: "NZD", quote: "USD" },
    { base: "EUR", quote: "GBP" },
    { base: "EUR", quote: "JPY" },
    { base: "GBP", quote: "JPY" },
    { base: "EUR", quote: "AUD" },
    { base: "AUD", quote: "JPY" },
    { base: "USD", quote: "TRY" },
    { base: "EUR", quote: "TRY" },
    { base: "GBP", quote: "TRY" },
  ];

  if (isTodayLoading || isYesterdayLoading) {
    return <Message text="Loading Market Data..." variant="loading" />;
  }

  if (todayError || !todayRates) {
    return (
      <Message
        text="Failed to fetch exchange rates."
        variant="error"
        onRetry={refetch}
      />
    );
  }

  // Kesintisiz sonsuz döngü akışı için listeyi ikiye katlıyoruz
  const doublePairs = [...marketSnapshotPairs, ...marketSnapshotPairs];

  return (
    <div className="pairs-card-ticker">
      <div className="pairs-ticker-header">
        <span className="ticker-title">MARKET SNAPSHOT</span>
        <span className="ticker-date">Last Updated: {latestApiDate || "—"}</span>
      </div>
      
      <div className="pairs-ticker-container">
        <div className="pairs-ticker-track">
          {doublePairs.map((pair, index) => {
            const base = pair.base.toUpperCase();
            const quote = pair.quote.toUpperCase();

            const calculateRate = (
              pool: { [key: string]: number } | undefined,
            ) => {
              if (!pool) return null;
              if (pool[`${base}_${quote}`] !== undefined)
                return pool[`${base}_${quote}`];
              if (
                pool[`${quote}_${base}`] !== undefined &&
                pool[`${quote}_${base}`] > 0
              )
                return 1 / pool[`${quote}_${base}`];

              const eurToBase = pool[`EUR_${base}`];
              const eurToQuote = pool[`EUR_${quote}`];
              if (eurToBase && eurToQuote && eurToBase > 0)
                return eurToQuote / eurToBase;
              return null;
            };

            const currentPairRate = calculateRate(todayRates);
            const yesterdayPairRate = calculateRate(yesterdayRates);

            let percentageValue = "0.00";
            let isPositive = true;

            if (currentPairRate && yesterdayPairRate) {
              const change = currentPairRate - yesterdayPairRate;
              const percentage = (change / yesterdayPairRate) * 100;

              isPositive = percentage >= 0;
              percentageValue = Math.abs(percentage).toFixed(2);
            }

            return (
              <div key={index} className="ticker-item">
                <span className="pair-name">{pair.base}/{pair.quote}</span>
                <span className="pair-value">
                  {currentPairRate !== null ? currentPairRate.toFixed(4) : "—"}
                </span>
                <span className={`pair-percentage ${isPositive ? "positive" : "negative"}`}>
                  {isPositive ? `▲ +${percentageValue}%` : `▼ -${percentageValue}%`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
