import { useState } from 'react'; 
import { useGetChartRatesQuery } from '../../store/currencyApi';
import './currency-chart.css';

interface CurrencyChartProps {
  base: string;
  quote: string;
}

export function CurrencyChart({ base, quote }: CurrencyChartProps) {
  const [days, setDays] = useState<number>(30);

  const { data: chartData, isLoading, error } = useGetChartRatesQuery({ base, quote, days });

  if (base === quote) return null;
  if (isLoading) return <div style={{ textAlign: 'center', padding: '1.5rem', color: '#64748b' }}>Finansal veriler taranıyor...</div>;
  if (error || !chartData || chartData.length === 0) return null;

  const rates = chartData.map((d) => d.rate);
  const maxRate = Math.max(...rates);
  const minRate = Math.min(...rates);
  const rateRange = maxRate - minRate || 1;

  const svgWidth = 600;
  const svgHeight = 160;
  const padding = 20;

  const step = Math.ceil(chartData.length / 6);
  const labelsX = chartData.filter((_, idx) => idx % step === 0);

  const points = chartData.map((day, idx) => {
    const x = padding + (idx / (chartData.length - 1)) * (svgWidth - padding * 2);
    const y = svgHeight - padding - ((day.rate - minRate) / rateRange) * (svgHeight - padding * 2);
    return { x, y, rate: day.rate, date: day.date };
  });

  const linePath = points.map((p) => `${p.x},${p.y}`).join(' ');
  const polygonPath = `${padding},${svgHeight} ${linePath} ${svgWidth - padding},${svgHeight}`;

  const timeframes = [
    { label: "7D", value: 7 },
    { label: "1M", value: 30 },
    { label: "3M", value: 90 },
    { label: "1Y", value: 365 }
  ];

  return (
    <div className="chart-container">
      <div className="chart-header-group">
        <h3 className="chart-title">📈 MARKET HISTORY ({days}D)</h3>
        
        <div className="timeframe-selector">
          {timeframes.map((tf) => (
            <button
              key={tf.value}
              className={`timeframe-btn ${days === tf.value ? 'active' : ''}`}
              onClick={() => setDays(tf.value)}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="chart-wrapper">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} width="100%" height="100%">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#84cc16" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#84cc16" stopOpacity="0.00" />
            </linearGradient>
          </defs>

          <polygon points={polygonPath} className="chart-polygon" />
          <polyline points={linePath} className="chart-line" />
          
          {points.map((p, idx) => (
            <circle
              key={idx}
              cx={p.x}
              cy={p.y}
              r="4" 
              className="chart-dot"
            >
              <title>{`${p.date}: ${p.rate.toFixed(4)}`}</title>
            </circle>
          ))}
        </svg>
      </div>

      <div className="chart-axis-x">
        {labelsX.map((day, idx) => (
          <span key={idx} className="chart-date-label">{day.date}</span>
        ))}
      </div>
    </div>
  );
}
