import { useState, useEffect } from "react";

interface FlagProps {
  code?: string;
  className?: string;
  width?: number;
  height?: number;
  provider?: 'flagsapi' | 'restcountries' | 'cdnjs';
}

export function Flag({ 
  code, 
  className = "currency-flag", 
  width = 24, 
  height = 18,
  provider = "flagsapi" 
}: FlagProps) {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [code, provider]);

  if (!code) return null;

  const cleanCode = code.trim();
  
  let flagUrl = "";
  if (provider === "flagsapi") {
    flagUrl = `https://flagsapi.com/{$cleanCode}/shiny/${width}.png`;
  } else if (provider === "restcountries") {
    flagUrl = `https://restcountries.com{cleanCode.toLowerCase()}.png`;
  } else if (provider === "cdnjs") {
    flagUrl = `https://cloudflare.com{cleanCode.toLowerCase()}.svg`;
  }

  const inlineStyle = {
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: "2px",
    objectFit: "cover" as const,
    display: "inline-block",
    verticalAlign: "middle"
  };

  if (isError) {
    return (
      <div 
        style={{ 
          ...inlineStyle, 
          backgroundColor: "#e2e8f0", 
          color: "#475569",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "9px",
          fontWeight: "bold"
        }}
        className={className}
      >
        {cleanCode.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={flagUrl}
      alt={`${code.toUpperCase()} flag`}
      style={inlineStyle}
      className={className}
      loading="lazy"
      onError={() => setIsError(true)}
    />
  );
}
