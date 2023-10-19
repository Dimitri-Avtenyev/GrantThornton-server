import exrService from "../src/services/exr.service";
import { ExchangeRate, ExchangeRateData } from "../src/types";

describe("getEurRates", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })
  it("should fetch correctly and return an array of rates EUR/Symbol", async () => {
    // mockoon data
    // for https://data-api.ecb.europa.eu/service/data/EXR/D..EUR.SP00.A?startPeriod=2023-10-18&endPeriod=2023-10-18&format=jsondata&detail=dataonly
    // date = 2023-10-18

    // host.docker.internal <-> localhost (or 127.0.0.1) outside of devcontainer
    const response = await fetch("http://host.docker.internal:3005/ECB/service/data/EUR");
    const data:ExchangeRateData = await response.json();
 
    let eurRates:ExchangeRate[] = []

    for (let i=0; i<Object.keys(data.dataSets[0].series).length; i++) {
      let eurRate:ExchangeRate = {
        symbol: data.structure.dimensions.series[1].values[i].id,
        rate: data.dataSets[0].series[`0:${i}:0:0:0`].observations[0][0]
      }
      
      eurRates.push(eurRate)
    }
    expect(eurRates).toEqual([
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
    ]);
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

