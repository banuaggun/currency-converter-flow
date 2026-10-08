import { useState } from "react";
import { useGetChartRatesQuery } from "../../store/currencyApi";
import "./currency-chart.css";
import { MarketStats } from "../market-stats/MarketStats";

interface CurrencyChartProps {
  base: string;
  quote: string;
}

export function CurrencyChart({ base, quote }: CurrencyChartProps) {
  const [days, setDays] = useState<number>(30);

  const {
    data: chartData,
    isLoading,
    error,
  } = useGetChartRatesQuery({ base, quote, days });

  if (base === quote) return null;
  if (isLoading)
    return (
      <div style={{ textAlign: "center", padding: "1.5rem", color: "#64748b" }}>
        Scanning financial data...
      </div>
    );
  if (error || !chartData || chartData.length === 0) return null;

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
    return { x, y, rate: day.rate, date: day.date };
  });

  const linePath = points.map((p) => `${p.x},${p.y}`).join(" ");

  const polygonPath = `${paddingLeft},${svgHeight - paddingBottom} ${linePath} ${svgWidth - paddingRight},${svgHeight - paddingBottom}`;

  const timeframes = [
    { label: "7D", value: 7 },
    { label: "1M", value: 30 },
    { label: "3M", value: 90 },
    { label: "1Y", value: 365 },
  ];

  const monthMap: { [key: string]: string } = {
    Oca: "Jan", Şub: "Feb", Mar: "Mar", Nis: "Apr",
    May: "May", Haz: "Jun", Tem: "Jul", Ağu: "Aug",
    Eyl: "Sep", Eki: "Oct", Kas: "Nov", Ara: "Dec"
  };

 const lastIndex = chartData.length - 1;
  const lastRate = chartData[lastIndex]?.rate || 0; 

    const dailyOpenRate = chartData.length > 1 ? chartData[lastIndex - 1].rate : lastRate;


  return (
    <div className="chart-container"> 
    <div className="chart-stats">
      <MarketStats  open={dailyOpenRate} last={lastRate} />
    </div>
      <div className="chart-header-group">
        <h3 className="chart-title"> MARKET HISTORY ({days}D)</h3>

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

      <div className="chart-wrapper">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          width="100%"
          height="100%">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#84cc16" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#84cc16" stopOpacity="0.00" />
            </linearGradient>
          </defs>

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

          <polygon
            points={polygonPath}
            className="chart-polygon"
            fill="url(#chartGradient)"
          />
          <polyline points={linePath} className="chart-line" />
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
