import axios from "axios";

class ApiClient {
  constructor() {
    if (ApiClient.instance) {
      return ApiClient.instance;
    }

    this.baseUrl = "http://api.exchangerate.host";
    this.apiKey = import.meta.env.VITE_EXCHANGE_API_KEY;
    ApiClient.instance = this;
  }

  async getRate(base, symbols) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/latest?access_key=${this.apiKey}&base=${base}&symbols=${symbols}`
      );
      if (response.data.success) {
        return response.data.rates;
      } else {
        throw new Error(response.data.error.info || "Failed to fetch rates");
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error.message);
      return null;
    }
  }
}

export default new ApiClient();
