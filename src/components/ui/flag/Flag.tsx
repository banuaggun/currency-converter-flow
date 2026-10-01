import { useState, useEffect } from "react";

interface FlagProps {
  code?: string;
  className?: string;
  width?: number;
  height?: number;
}

const currencyToCountryMap: Record<string, string> = {
  USD: "us", 
  EUR: "eu", 
  TRY: "tr", 
  GBP: "gb", 
  AUD: "au", 
  BGN: "bg", 
  BRL: "br", 
  CAD: "ca", 
  CHF: "ch", 
  CNY: "cn", 
  CZK: "cz", 
  DKK: "dk", 
  HKD: "hk", 
  HUF: "hu", 
  IDR: "id", 
  ILS: "il", 
  INR: "in", 
  ISK: "is", 
  JPY: "jp", 
  KRW: "kr", 
  MXN: "mx", 
  MYR: "my", 
  NOK: "no", 
  NZD: "nz", 
  PHP: "ph", 
  PLN: "pl", 
  RON: "ro", 
  RUB: "ru", 
  SEK: "se", 
  SGD: "sg", 
  THB: "th", 
  ZAR: "za", 
};

export function Flag({ 
  code, 
  className = "currency-flag", 
  width = 24, 
  height = 24 
}: FlagProps) {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [code]);

  if (!code) return null;

  const upperCode = code.trim().toUpperCase();
  let finalCountryCode = "";

  if (currencyToCountryMap[upperCode]) {
    finalCountryCode = currencyToCountryMap[upperCode];
  } else {
    finalCountryCode = upperCode.slice(0, 2).toLowerCase();
  }

  const flagUrl = "https://flagcdn.io/" + finalCountryCode + ".svg";

  const inlineStyle = {
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: "24px",
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
        {upperCode.slice(0, 2)}
      </div>
    );
  }

  return (
    <img
      src={flagUrl}
      alt={`${upperCode} flag`}
      style={inlineStyle}
      className={className}
      loading="lazy"
      onError={() => {
        console.error("Flag could not be loaded, falling back to placeholder:", flagUrl);
        setIsError(true);
      }}
    />
  );
}
