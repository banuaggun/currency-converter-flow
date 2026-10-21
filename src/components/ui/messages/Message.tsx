import "./message.css";

interface MessageProps {
  text: any;
  variant?: "error" | "loading" | "info";
  onRetry?: () => void;
}

export function Message({ text, variant = "info", onRetry }: MessageProps) {
  const renderText = (): string => {
    if (!text) return "";
    if (typeof text === "string") return text;
    if ("error" in text) return text.error;
    if (
      "data" in text &&
      text.data &&
      typeof text.data === "object" &&
      "message" in text.data
    ) {
      return String((text.data as any).message);
    }
    return JSON.stringify(text);
  };

  return (
    <div className={`message-container variant-${variant}`}>
      {variant === "loading" && (
        <div className="message-spinner" aria-hidden="true" />
      )}

      {variant === "error" && (
        <div className="message-icon" aria-hidden="true">
          ⚠️
        </div>
      )}

      {variant === "info" && (
        <div className="message-icon" aria-hidden="true">
          ℹ️
        </div>
      )}

      <p className="message-text" style={{ margin: 0 }}>
        {renderText()}
      </p>

      {variant === "error" && onRetry && (
        <button className="message-retry-btn" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}
