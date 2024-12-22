import { useEffect, useState } from "react";
import ApiClient from "../utils/api-client";
import getRangeOfDays from "../utils/get-range-of-days";

const useRate = (baseCurrency, quoteCurrency) => {
  const [rate, setRate] = useState(0);
  const [historicalData, setHistoricalData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRateAndData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const api = ApiClient;
        const currentRate = await api.getRate(baseCurrency, quoteCurrency);

        setRate(currentRate);

        const { startDate, endDate } = getRangeOfDays(7);

        const historicalData = await api.getHistoricalRates(
          baseCurrency,
          quoteCurrency,
          startDate,
          endDate
        );

        setHistoricalData(
          Object.entries(historicalData).map(([date, value]) => ({
            date,
            value: Object.values(value)[0],
          }))
        );
      } catch (error) {
        setError("Error fetching historical rates:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRateAndData();
  }, [baseCurrency, quoteCurrency]);

  return {
    rate,
    historicalData,
    isLoading,
    error,
  };
};

export default useRate;
