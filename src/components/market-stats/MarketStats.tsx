interface MarketStatsProps {
  open: number;
  last: number;
}

export function MarketStats({ open, last }: MarketStatsProps) {
  const change = last - open;
  const percentChange = open !== 0 ? (change / open) * 100 : 0;

  const isPositive = change >= 0;

  return (
    <div className="market-stats">
      <div className="market-stat">
        <span className="market-stat-label">OPEN</span>
        <span className="market-stat-value">
          {open.toFixed(4)}
        </span>
      </div>

      <div className="market-stat">
        <span className="market-stat-label">LAST</span>
        <span className="market-stat-value">
          {last.toFixed(4)}
        </span>
      </div>

      <div className="market-stat">
        <span className="market-stat-label">CHANGE</span>
        <span
          className={`market-stat-change ${
            isPositive ? "positive" : "negative"
          }`}
        >
          {isPositive ? "+" : ""}
          {change.toFixed(4)}
        </span>
      </div>

      <div className="market-stat">
        <span className="market-stat-label">% CHANGE</span>
        <span
          className={`market-stat-change ${
            isPositive ? "positive" : "negative"
          }`}
        >
          {isPositive ? "▲" : "▼"}{" "}
          {isPositive ? "+" : ""}
          {percentChange.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}