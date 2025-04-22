import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

interface Quote {
  quoteText: string;
  quoteAuthor: string;
}

const QuoteCard = () => {
  const [quote, setQuote] = useState<Quote>({ quoteText: "", quoteAuthor: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scriptElement, setScriptElement] = useState<HTMLScriptElement | null>(null);

  const fetchQuote = () => {
    setLoading(true);
    setError(null);
    const callbackName = `jsonp_${Date.now()}`;

    // Clean up previous script if exists
    if (scriptElement && document.body.contains(scriptElement)) {
      document.body.removeChild(scriptElement);
    }

    // Create JSONP callback
    (window as any)[callbackName] = (data: Quote) => {
      delete (window as any)[callbackName];
      if (scriptElement && document.body.contains(scriptElement)) {
        document.body.removeChild(scriptElement);
      }

      if (data && data.quoteText) {
        setQuote({
          quoteText: data.quoteText,
          quoteAuthor: data.quoteAuthor || "Unknown",
        });
        setLoading(false);
      } else {
        setError("Failed to fetch quote. Please try again later.");
        setLoading(false);
      }
    };

    // Create new script element
    const script = document.createElement("script");
    script.src = `https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=${callbackName}`;
    script.onerror = () => {
      delete (window as any)[callbackName];
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      setError("Failed to fetch quote. Please try again later.");
      setLoading(false);
    };

    document.body.appendChild(script);
    setScriptElement(script);
  };

  useEffect(() => {
    return () => {
      if (scriptElement && document.body.contains(scriptElement)) {
        document.body.removeChild(scriptElement);
      }
    };
  }, [scriptElement]);

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center h-64 gap-4">
      {loading ? (
        <p>Loading quote...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <p className="text-xl md:text-2xl font-bold text-center">"{quote.quoteText}"</p>
          <p className="text-sm text-gray-600">- {quote.quoteAuthor}</p>
        </>
      )}

      <button onClick={fetchQuote} className="flex items-center gap-1 text-sm hover:text-blue-600 transition-colors" disabled={loading}>
        <RotateCcw size={16} />
        {loading ? "Loading..." : "Refresh"}
      </button>
    </div>
  );
};

export default QuoteCard;
