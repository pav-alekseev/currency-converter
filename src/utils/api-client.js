import axios from "axios";

class ApiClient {
  constructor() {
    if (ApiClient.instance) {
      return ApiClient.instance;
    }

    this.baseUrl = "https://api.exchangerate.host";
    this.apiKey = import.meta.env.VITE_EXCHANGE_API_KEY;
    ApiClient.instance = this;
  }

  async getRate(base, symbols) {
    const response = await axios.get(
      `${this.baseUrl}/convert?access_key=${
        this.apiKey
      }&from=${base}&to=${symbols}&amount=${1}`
    );

    if (response.data.success) {
      return response.data.result;
    } else {
      throw new Error(response.data.error.info || "Failed to fetch rates");
    }
  }

  async getHistoricalRates(baseCurrency, quoteCurrency, startDate, endDate) {
    const response = await axios.get(
      `${this.baseUrl}/timeframe?access_key=${this.apiKey}&start_date=${startDate}&end_date=${endDate}&source=${baseCurrency}&currencies=${quoteCurrency}`
    );

    if (response.data.success) {
      return response.data.quotes;
    } else {
      throw new Error(
        response.data.error.info || "Failed to fetch historical rates"
      );
    }
  }
}

export default new ApiClient();
