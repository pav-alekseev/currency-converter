import getRangeOfDays from '../get-range-of-days';

describe('getRangeOfDays', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2023-12-31T00:00:00Z')); // Устанавливаем фиксированную дату для тестов
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('returns correct range for 7 days', () => {
    const range = 7;
    const result = getRangeOfDays(range);

    expect(result).toEqual({
      startDate: '2023-12-24', // 7 дней назад от 2023-12-31
      endDate: '2023-12-31', // Текущая дата
    });
  });

  test('returns correct range for 30 days', () => {
    const range = 30;
    const result = getRangeOfDays(range);

    expect(result).toEqual({
      startDate: '2023-12-01', // 30 дней назад от 2023-12-31
      endDate: '2023-12-31',
    });
  });

  test('returns correct range for 0 days', () => {
    const range = 0;
    const result = getRangeOfDays(range);

    expect(result).toEqual({
      startDate: '2023-12-31', // Начало и конец совпадают
      endDate: '2023-12-31',
    });
  });
});