import React from 'react';
import { render, waitFor } from '@testing-library/react';
import useRate from '../use-rate';
import ApiClient from '../../utils/api-client';
import getRangeOfDays from '../../utils/get-range-of-days';

jest.mock('../../utils/api-client', () => ({
  getRate: jest.fn(),
  getHistoricalRates: jest.fn(),
}));

jest.mock('../../utils/get-range-of-days', () => jest.fn());

const TestComponent = ({ baseCurrency, quoteCurrency }) => {
  const { rate, historicalData, isLoading, error } = useRate(baseCurrency, quoteCurrency);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <p>Rate: {rate}</p>
      <ul>
        {historicalData.map((data) => (
          <li key={data.date}>{`${data.date}: ${data.value}`}</li>
        ))}
      </ul>
    </div>
  );
};

describe('useRate hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches current rate and historical data successfully', async () => {
    ApiClient.getRate.mockResolvedValue(1.12);
    getRangeOfDays.mockReturnValue({
      startDate: '2023-12-24',
      endDate: '2023-12-31',
    });
    ApiClient.getHistoricalRates.mockResolvedValue({
      '2023-12-24': { USD: 1.1 },
      '2023-12-25': { USD: 1.11 },
      '2023-12-26': { USD: 1.12 },
    });

    const { getByText, findByText } = render(<TestComponent baseCurrency="USD" quoteCurrency="EUR" />);

    expect(getByText(/Loading/i)).toBeInTheDocument();

    // Используем findByText, который возвращает Promise, чтобы дождаться рендера
    expect(await findByText(/Rate: 1.12/i)).toBeInTheDocument();
    expect(await findByText(/2023-12-24: 1.1/i)).toBeInTheDocument();
    expect(await findByText(/2023-12-25: 1.11/i)).toBeInTheDocument();
    expect(await findByText(/2023-12-26: 1.12/i)).toBeInTheDocument();
  });

  test('handles errors during fetching', async () => {
    ApiClient.getRate.mockRejectedValue(new Error('Failed to fetch rate'));

    const { findByText } = render(<TestComponent baseCurrency="USD" quoteCurrency="EUR" />);

    expect(await findByText(/Error fetching rates/i)).toBeInTheDocument();
  });
});