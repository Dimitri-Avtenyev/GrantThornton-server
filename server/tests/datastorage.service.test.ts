import datastorageService from "../src/services/datastorage.service";
import { ExchangeRate, ExchangeRateDict } from "../src/types";

let eurRate: ExchangeRateDict = {
  "2023-05-02": [
    {
      "symbol": "AUD",
      "rate": 1.6371
    },
    {
      "symbol": "BGN",
      "rate": 1.9558
    },
    {
      "symbol": "BRL",
      "rate": 5.4853
    },
    {
      "symbol": "CAD",
      "rate": 1.4885
    },
    {
      "symbol": "CHF",
      "rate": 0.9841
    },
    {
      "symbol": "CNY",
      "rate": 7.5791
    },
    {
      "symbol": "CZK",
      "rate": 23.587
    },
    {
      "symbol": "DKK",
      "rate": 7.4538
    },
    {
      "symbol": "GBP",
      "rate": 0.87868
    },
    {
      "symbol": "HKD",
      "rate": 8.6075
    },
    {
      "symbol": "HUF",
      "rate": 371.98
    },
    {
      "symbol": "IDR",
      "rate": 16143.37
    },
    {
      "symbol": "ILS",
      "rate": 3.9717
    },
    {
      "symbol": "INR",
      "rate": 89.7515
    },
    {
      "symbol": "ISK",
      "rate": 149.7
    },
    {
      "symbol": "JPY",
      "rate": 150.7
    },
    {
      "symbol": "KRW",
      "rate": 1470.32
    },
    {
      "symbol": "MXN",
      "rate": 19.6703
    },
    {
      "symbol": "MYR",
      "rate": 4.8948
    },
    {
      "symbol": "NOK",
      "rate": 11.762
    },
    {
      "symbol": "NZD",
      "rate": 1.7654
    },
    {
      "symbol": "PHP",
      "rate": 60.712
    },
    {
      "symbol": "PLN",
      "rate": 4.5758
    },
    {
      "symbol": "RON",
      "rate": 4.9305
    },
    {
      "symbol": "SEK",
      "rate": 11.2915
    },
    {
      "symbol": "SGD",
      "rate": 1.4646
    },
    {
      "symbol": "THB",
      "rate": 37.478
    },
    {
      "symbol": "TRY",
      "rate": 21.3508
    },
    {
      "symbol": "USD",
      "rate": 1.0965
    },
    {
      "symbol": "ZAR",
      "rate": 20.146
    }
  ]
}
describe("getDbData", () => {
  it("should return data from db with date as input", async () => {
    const query: string = "2023-05-02";
    const result: ExchangeRate[] = await datastorageService.getDbData(new Date(query));

    expect(result).toEqual(eurRate[query]);
  });
});

describe("getLocalData", () => {
  it("should return data from localdb with date as input", async () => {
    const query: string = "2023-05-02";
    const result: ExchangeRate[] = await datastorageService.getLocalData(new Date(query));

    expect(result).toEqual(eurRate[query]);
  });
});