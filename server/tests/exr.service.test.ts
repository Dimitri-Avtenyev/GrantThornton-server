import exrService from "../src/services/exr.service";
import { ExchangeRate, ExchangeRateData, ExchangeRateDict } from "../src/types";

describe("getEurRates", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })
  it("should fetch correctly and return an array of rates EUR/Symbol", async () => {
    // mockoon data
    // for https://data-api.ecb.europa.eu/service/data/EXR/D..EUR.SP00.A?startPeriod=2023-10-18&endPeriod=2023-10-18&format=jsondata&detail=dataonly
    // date = 2023-10-18

    // host.docker.internal <-> localhost (or 127.0.0.1) outside of devcontainer
    // use mockoon with data provided in ./mockoonTestData.json
    const response = await fetch("http://host.docker.internal:3005/ECB/service/data/EUR");
    const mockdata:ExchangeRateData = await response.json();
 
    let eurRates: ExchangeRateDict = await exrService.exchangeRateDictBuilderECB(mockdata);

    expect(eurRates).toEqual({
      '2023-10-16': [
        { symbol: 'AUD', rate: 1.666 },
        { symbol: 'BGN', rate: 1.9558 },
        { symbol: 'BRL', rate: 5.333 },
        { symbol: 'CAD', rate: 1.436 },
        { symbol: 'CHF', rate: 0.9505 },
        { symbol: 'CNY', rate: 7.7058 },
        { symbol: 'CZK', rate: 24.664 },
        { symbol: 'DKK', rate: 7.4592 },
        { symbol: 'GBP', rate: 0.86545 },
        { symbol: 'HKD', rate: 8.2382 },
        { symbol: 'HUF', rate: 387.05 },
        { symbol: 'IDR', rate: 16548.56 },
        { symbol: 'ILS', rate: 4.2055 },
        { symbol: 'INR', rate: 87.7315 },
        { symbol: 'ISK', rate: 146.3 },
        { symbol: 'JPY', rate: 157.54 },
        { symbol: 'KRW', rate: 1427.29 },
        { symbol: 'MXN', rate: 18.9329 },
        { symbol: 'MYR', rate: 4.9908 },
        { symbol: 'NOK', rate: 11.517 },
        { symbol: 'NZD', rate: 1.7798 },
        { symbol: 'PHP', rate: 59.814 },
        { symbol: 'PLN', rate: 4.4733 },
        { symbol: 'RON', rate: 4.965 },
        { symbol: 'SEK', rate: 11.5375 },
        { symbol: 'SGD', rate: 1.4427 },
        { symbol: 'THB', rate: 38.221 },
        { symbol: 'TRY', rate: 29.3809 },
        { symbol: 'USD', rate: 1.0538 },
        { symbol: 'ZAR', rate: 19.8069 }
      ],
      '2023-10-17': [
        { symbol: 'AUD', rate: 1.6622 },
        { symbol: 'BGN', rate: 1.9558 },
        { symbol: 'BRL', rate: 5.3305 },
        { symbol: 'CAD', rate: 1.4411 },
        { symbol: 'CHF', rate: 0.9517 },
        { symbol: 'CNY', rate: 7.7288 },
        { symbol: 'CZK', rate: 24.603 },
        { symbol: 'DKK', rate: 7.461 },
        { symbol: 'GBP', rate: 0.8682 },
        { symbol: 'HKD', rate: 8.2681 },
        { symbol: 'HUF', rate: 384.98 },
        { symbol: 'IDR', rate: 16609.18 },
        { symbol: 'ILS', rate: 4.2264 },
        { symbol: 'INR', rate: 87.9585 },
        { symbol: 'ISK', rate: 146.5 },
        { symbol: 'JPY', rate: 158.03 },
        { symbol: 'KRW', rate: 1429.58 },
        { symbol: 'MXN', rate: 18.9577 },
        { symbol: 'MYR', rate: 5.0055 },
        { symbol: 'NOK', rate: 11.576 },
        { symbol: 'NZD', rate: 1.7929 },
        { symbol: 'PHP', rate: 59.974 },
        { symbol: 'PLN', rate: 4.4273 },
        { symbol: 'RON', rate: 4.9685 },
        { symbol: 'SEK', rate: 11.53 },
        { symbol: 'SGD', rate: 1.4471 },
        { symbol: 'THB', rate: 38.482 },
        { symbol: 'TRY', rate: 29.5084 },
        { symbol: 'USD', rate: 1.0569 },
        { symbol: 'ZAR', rate: 19.9138 }
      ],
      '2023-10-18': [
        { symbol: 'AUD', rate: 1.6586 },
        { symbol: 'BGN', rate: 1.9558 },
        { symbol: 'BRL', rate: 5.3295 },
        { symbol: 'CAD', rate: 1.4425 },
        { symbol: 'CHF', rate: 0.9492 },
        { symbol: 'CNY', rate: 7.7278 },
        { symbol: 'CZK', rate: 24.68 },
        { symbol: 'DKK', rate: 7.461 },
        { symbol: 'GBP', rate: 0.8661 },
        { symbol: 'HKD', rate: 8.2687 },
        { symbol: 'HUF', rate: 384.13 },
        { symbol: 'IDR', rate: 16648.12 },
        { symbol: 'ILS', rate: 4.2515 },
        { symbol: 'INR', rate: 87.954 },
        { symbol: 'ISK', rate: 146.3 },
        { symbol: 'JPY', rate: 158.1 },
        { symbol: 'KRW', rate: 1428.23 },
        { symbol: 'MXN', rate: 19.0247 },
        { symbol: 'MYR', rate: 5.0126 },
        { symbol: 'NOK', rate: 11.595 },
        { symbol: 'NZD', rate: 1.7919 },
        { symbol: 'PHP', rate: 59.914 },
        { symbol: 'PLN', rate: 4.441 },
        { symbol: 'RON', rate: 4.972 },
        { symbol: 'SEK', rate: 11.5643 },
        { symbol: 'SGD', rate: 1.4467 },
        { symbol: 'THB', rate: 38.319 },
        { symbol: 'TRY', rate: 29.592 },
        { symbol: 'USD', rate: 1.0565 },
        { symbol: 'ZAR', rate: 19.8917 }
      ]
    });
  })
})



describe("atLeastOneDayOlder", () => {
  it('should return true when date is at least one day older', () => {
    let today: Date = new Date();
    let yesterday: Date = new Date();
    yesterday.setDate(today.getDate() - 1.01);

    const result = exrService.atLeastOneDayOlder(yesterday);
    expect(result).toBe(true);
  });
  it("should return false when the date is not at least one day older", () => {
    let today: Date = new Date();
    let yesterday: Date = new Date();
    yesterday.setDate(today.getDate() + 1);

    const result = exrService.atLeastOneDayOlder(yesterday);
    expect(result).toBe(false);
  });
});

describe("weekdayCheckAndAdjust", () => {
  interface TestCases {
    input: Date;
    expected: Date
  }
  it("should return dates one day before if it's saturday", () => {

    const testSaturdayCases:TestCases[] = [
      {input: new Date("2023-10-07"), expected:new Date("2023-10-06")},
      {input: new Date("2023-10-14"), expected:new Date("2023-10-13")},
      {input: new Date("2023-10-21"), expected:new Date("2023-10-20")}
    ];

    testSaturdayCases.forEach((testCase:TestCases) => {
      const result = exrService.weekdayCheckAndAdjust(testCase.input);
      expect(result).toStrictEqual(testCase.expected);
    });
  });

  it("should return dates two days before if it's sunday", () => {

    const testSaturdayCases:TestCases[] = [
      {input: new Date("2023-10-08"), expected:new Date("2023-10-06")},
      {input: new Date("2023-10-15"), expected:new Date("2023-10-13")},
      {input: new Date("2023-10-22"), expected:new Date("2023-10-20")}
    ];

    testSaturdayCases.forEach((testCase:TestCases) => {
      const result = exrService.weekdayCheckAndAdjust(testCase.input);
      expect(result).toStrictEqual(testCase.expected);
    });
  })
})

