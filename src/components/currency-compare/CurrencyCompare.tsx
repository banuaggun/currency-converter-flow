import { useState } from "react";
import { useGetChartRatesQuery } from "../../store/currencyApi";
import { MarketStats } from "../market-stats/MarketStats";

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
  } = useGetChartRatesQuery({ base, quote: compareWith, days });

  const timeframes = [
    { label: "7D", value: 7 },
    { label: "1M", value: 30 },
    { label: "3M", value: 90 },
    { label: "1Y", value: 365 },
  ];

  if (base === compareWith) {
    return (
      <div style={{ color: "#ef4444", textAlign: "center", padding: "2rem" }}>
        Please select a currency different from the base currency.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
        Fetching comparative market data...
      </div>
    );
  }

  if (error || !chartData || chartData.length === 0) {
    return (
      <div style={{ color: "#ef4444", textAlign: "center", padding: "2rem" }}>
        Failed to load comparative market data.
      </div>
    );
  }

  const rates = chartData.map((d) => d.rate);
  const maxRate = Math.max(...rates);
  const minRate = Math.min(...rates);
  const midRate = (maxRate + minRate) / 2;
  const rateRange = maxRate - minRate || 1;

  const svgWidth = 600;
  const svgHeight = 160;

  const paddingLeft = 65;
  const paddingRight = 20;
  const paddingTop = 15;
  const paddingBottom = 15;

  const step = Math.ceil(chartData.length / 6);
  const labelsX = chartData.filter((_, idx) => idx % step === 0);

  const points = chartData.map((day, idx) => {
    const x =
      paddingLeft +
      (idx / (chartData.length - 1)) * (svgWidth - paddingLeft - paddingRight);
    const y =
      svgHeight -
      paddingBottom -
      ((day.rate - minRate) / rateRange) *
        (svgHeight - paddingTop - paddingBottom);
    return { x, y };
  });

  const linePath = points.map((p) => `${p.x},${p.y}`).join(" ");

  const lastIndex = chartData.length - 1;
  const lastRate = chartData[lastIndex]?.rate || 0;
  const dailyOpenRate =
    chartData.length > 1 ? chartData[lastIndex - 1].rate : lastRate;

  return (
    <div className="compare-container">
      <div className="chart-stats">
        <MarketStats open={dailyOpenRate} last={lastRate} />
      </div>

      <div
        className="chart-header-group"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <h3 className="chart-title" style={{ margin: 0, fontSize: "1rem" }}>
            COMPARE WITH:
          </h3>
          <select
            value={compareWith}
            onChange={(e) => setCompareWith(e.target.value)}
            className="compare-select"
            style={{
              backgroundColor: "#0f172a",
              color: "#ffffff",
              border: "1px solid #334155",
              padding: "0.35rem 0.75rem",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
            }}>
            {/* Ana çeviricide seçili olan kur listede gizlensin veya seçilemesin */}
            {base !== "EUR" && <option value="EUR">EUR (Euro)</option>}
            {base !== "USD" && <option value="USD">USD (Dolar)</option>}
            {base !== "GBP" && <option value="GBP">GBP (Sterlin)</option>}
            {base !== "JPY" && <option value="JPY">JPY (Yen)</option>}
            {base !== "TRY" && <option value="TRY">TRY (Lira)</option>}
            {base !== "AUD" && (
              <option value="AUD">AUD (Avustralya Dollar)</option>
            )}
          </select>
        </div>

        <div className="timeframe-selector">
          {timeframes.map((tf) => (
            <button
              key={tf.value}
              className={`timeframe-btn ${days === tf.value ? "active" : ""}`}
              onClick={() => setDays(tf.value)}>
              {tf.label}
            </button>
          ))}
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
        per <span style={{ color: "#000", fontWeight: "600" }}>1 {base}</span>{" "}
        over the last {days} days.
      </div>

      <div className="chart-wrapper">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          width="100%"
          height="100%">
          <g className="chart-axis-y-text">
            <text x={paddingLeft - 10} y={paddingTop + 5} textAnchor="end">
              {maxRate.toFixed(4)}
            </text>
            <text x={paddingLeft - 10} y={svgHeight / 2 + 2} textAnchor="end">
              {midRate.toFixed(4)}
            </text>
            <text
              x={paddingLeft - 10}
              y={svgHeight - paddingBottom}
              textAnchor="end">
              {minRate.toFixed(4)}
            </text>
          </g>

          <g className="chart-grid-lines">
            <line
              x1={paddingLeft}
              y1={paddingTop}
              x2={svgWidth - paddingRight}
              y2={paddingTop}
            />
            <line
              x1={paddingLeft}
              y1={svgHeight / 2}
              x2={svgWidth - paddingRight}
              y2={svgHeight / 2}
            />
            <line
              x1={paddingLeft}
              y1={svgHeight - paddingBottom}
              x2={svgWidth - paddingRight}
              y2={svgHeight - paddingBottom}
            />
          </g>

          <polyline
            points={linePath}
            className="chart-line-compare"
            style={{ fill: "none", stroke: "#38bdf8", strokeWidth: 2 }}
          />
        </svg>
      </div>

      <div
        className="chart-axis-x"
        style={{ paddingLeft: `${(paddingLeft / svgWidth) * 100}%` }}>
        {labelsX.map((day, idx) => (
          <span key={idx} className="chart-date-label">
            {day.date}
          </span>
        ))}
      </div>
    </div>
  );
}
