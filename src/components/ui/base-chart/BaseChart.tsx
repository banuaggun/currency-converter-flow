import "./base-chart.css";

interface ChartDataPoint {
  date: string;
  rate: number;
}

interface BaseChartProps {
  data: ChartDataPoint[];
  variant?: "area" | "line";
  lineColor?: string;
  gradientColor?: string;
  textColor?: string; 
  currentDays: number;
  onTimeframeChange: (days: number) => void;
}

export function BaseChart({
  data,
  variant = "area", 
  lineColor = "#38bdf8",
  gradientColor, 
  textColor = "#71717a", 
  currentDays,
  onTimeframeChange,
}: BaseChartProps) {
  if (!data || data.length === 0) return null;

  const activeGradientColor = gradientColor || lineColor;

  const gradientId = `chart-gradient-${lineColor.replace("#", "")}`;

  const rates = data.map((d) => d.rate);
  const maxRate = Math.max(...rates);
  const minRate = Math.min(...rates);
  const midRate = (maxRate + minRate) / 2;
  const rateRange = maxRate - minRate || 1;

  const svgWidth = 600;
  const svgHeight = 160;

  const paddingLeft = 75;
  const paddingRight = 50;
  const paddingTop = 15;
  const paddingBottom = 45; 

  const points = data.map((day, idx) => {
    const x =
      paddingLeft +
      (idx / (data.length - 1)) * (svgWidth - paddingLeft - paddingRight);
    const y =
      svgHeight -
      paddingBottom -
      ((day.rate - minRate) / rateRange) *
        (svgHeight - paddingTop - paddingBottom);
    return { x, y };
  });

  const linePath = points.map((p) => `${p.x},${p.y}`).join(" ");
  const lastPoint = points[points.length - 1];
  const polygonPath = `${paddingLeft},${svgHeight - paddingBottom} ${linePath} ${lastPoint?.x || svgWidth - paddingRight},${svgHeight - paddingBottom}`;

  const step = Math.ceil(data.length / 6);
  const labelsX = data.reduce<{ date: string; x: number }[]>((acc, day, idx) => {
    if (idx % step === 0) {
      acc.push({ date: day.date, x: points[idx].x });
    }
    return acc;
  }, []);

  const timeframes = [
    { label: "7D", value: 7 },
    { label: "1M", value: 30 },
    { label: "3M", value: 90 },
    { label: "1Y", value: 365 },
  ];

  return (
    <div className="base-chart-container">

      <div className="timeframe-selector">
        {timeframes.map((tf) => (
          <button
            key={tf.value}
            className={`timeframe-btn ${currentDays === tf.value ? "active" : ""}`}
            onClick={() => onTimeframeChange(tf.value)}
          >
            {tf.label}
          </button>
        ))}
      </div>

      <div className="chart-wrapper">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} width="100%" height="100%">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={activeGradientColor} stopOpacity="0.28" />
              <stop offset="100%" stopColor={activeGradientColor} stopOpacity="0.00" />
            </linearGradient>
          </defs>

          <g className="chart-axis-y-text" style={{ fill: textColor }}>
            <text x={paddingLeft - 10} y={paddingTop + 5} textAnchor="end">{maxRate.toFixed(4)}</text>
            <text x={paddingLeft - 10} y={(svgHeight - paddingBottom + paddingTop) / 2 + 4} textAnchor="end">{midRate.toFixed(4)}</text>
            <text x={paddingLeft - 10} y={svgHeight - paddingBottom + 4} textAnchor="end">{minRate.toFixed(4)}</text>
          </g>

          <g className="chart-grid-lines">
            <line x1={paddingLeft} y1={paddingTop} x2={svgWidth - paddingRight} y2={paddingTop} />
            <line x1={paddingLeft} y1={(svgHeight - paddingBottom + paddingTop) / 2} x2={svgWidth - paddingRight} y2={(svgHeight - paddingBottom + paddingTop) / 2} />
            <line x1={paddingLeft} y1={svgHeight - paddingBottom} x2={svgWidth - paddingRight} y2={svgHeight - paddingBottom} />
          </g>

          {variant === "area" && <polygon points={polygonPath} fill={`url(#${gradientId})`} />}
          
          <polyline points={linePath} fill="none" stroke={lineColor} strokeWidth={2} />

          <g className="chart-axis-x-text" style={{ fill: textColor }}>
            {labelsX.map((label, idx) => (
              <text key={idx} x={label.x} y={svgHeight - 15} textAnchor="middle" className="chart-date-label">
                {label.date}
              </text>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
