import { useState } from "react";
import { useGetChartRatesQuery } from "../../store/currencyApi";
import { MarketStats } from "../market-stats/MarketStats";
import { BaseChart } from "../ui/base-chart/BaseChart";
import "./currency-compare.css";
import { Message } from "../ui/messages/Message";

interface CurrencyCompareProps {
  base: string;
}

export function CurrencyCompare({ base }: CurrencyCompareProps) {
  const [compareWith, setCompareWith] = useState(
    base === "EUR" ? "GBP" : "EUR",
  );
  const [days, setDays] = useState<number>(30);

  const {
    data: chartData,
    isLoading,
    error,
    refetch,
  } = useGetChartRatesQuery({ base, quote: compareWith, days });

  if (base === compareWith) {
    return (
      <Message
        text=" Please select a currency different from the base currency."
        variant="info"
      />
    );
  }

  if (isLoading) {
    return (
      <Message text="Fetching comparative market data..." variant="loading" />
    );
  }

  if (error || !chartData || chartData.length === 0) {
    return (
      <Message
        text="Failed to load comparative market data."
        variant="error"
        onRetry={refetch}
      />
    );
  }

  const lastIndex = chartData.length - 1;
  const lastRate = chartData[lastIndex]?.rate || 0;
  const dailyOpenRate =
    chartData.length > 1 ? chartData[lastIndex - 1].rate : lastRate;

  return (
    <div className="compare-container">
      <div className="chart-stats">
        <MarketStats open={dailyOpenRate} last={lastRate} />
      </div>

      <div className="chart-header-group">
        <div className="chart-content">
          <h3 className="chart-title">COMPARE WITH:</h3>
          <select
            value={compareWith}
            onChange={(e) => setCompareWith(e.target.value)}
            className="compare-select">
            {base !== "EUR" && <option value="EUR">EUR (Euro)</option>}
            {base !== "USD" && <option value="USD">USD (Dolar)</option>}
            {base !== "GBP" && <option value="GBP">GBP (Sterlin)</option>}
            {base !== "JPY" && <option value="JPY">JPY (Yen)</option>}
            {base !== "TRY" && <option value="TRY">TRY (Lira)</option>}
            {base !== "AUD" && (
              <option value="AUD">AUD (Australian Dollar)</option>
            )}
          </select>
        </div>
      </div>

      <div
        className="compare-summary-text"
        style={{
          color: "#64748b",
          fontSize: "0.85rem",
          fontWeight: "500",
          marginBottom: "0.75rem",
          letterSpacing: "0.03em",
        }}>
        Showing relative performance of{" "}
        <span style={{ color: "#38bdf8", fontWeight: "600" }}>
          {compareWith}
        </span>{" "}
        per <span style={{ color: "#000", fontWeight: "600" }}> {base}</span>{" "}
        over the last {days} days.
      </div>

      <BaseChart
        data={chartData}
        variant="area"
        lineColor="#38bdf8"
        currentDays={days}
        onTimeframeChange={setDays}
      />
    </div>
  );
}
