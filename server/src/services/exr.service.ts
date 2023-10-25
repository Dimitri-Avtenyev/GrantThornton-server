import { ExchangeRate, ExchangeRateData, ExchangeRateDict } from "../types";

//--- data retrieval from "ECB ---//
// D = Day, . = wildcard (can be filled with other symbols), EUR = symbol, 
// SP00 = ECB foreign exchange reference rates – code, A = time variation
// ---
// ? parameters -> startPeriod, endPeriod, format, detail
// dates in ISO format
// https://data-api.ecb.europa.eu/service/data/EXR/D..EUR.SP00.A?startPeriod=2023-10-17&endPeriod=2023-10-18&format=jsondata&detail=dataonly


// available formats jsondata, csvdata, structurespecificdata, genericdata
// ECB webservice entry point
const entryPoint: string = "https://data-api.ecb.europa.eu/service/data/EXR/D..EUR.SP00.A";

const getEurRates = async (date: Date, endPeriod?: string, format: string = "jsondata"): Promise<ExchangeRateDict> => {
  date = weekdayCheckAndAdjust(date);
  if (!endPeriod) {
    endPeriod = date.toISOString().split("T")[0];
    console.log(endPeriod);
  }

  let startPediod = date.toISOString().split("T")[0];
  const response = await fetch(`${entryPoint}?startPeriod=${startPediod}&endPeriod=${endPeriod}&format=${format}&detail=dataonly`);
  const data: ExchangeRateData = await response.json();

  // dict builder
  let eurRates: ExchangeRateDict = await exchangeRateDictBuilderECB(data);

  return eurRates;
}


//--- data retrieval from "exchangeratesapi" ---///
//   todo
// ---                                      ---///

const exchangeRateDictBuilderECB = async (data: ExchangeRateData): Promise<ExchangeRateDict> => {
  let eurRates: ExchangeRateDict = {};
  for (let i = 0; i < Object.keys(data.structure.dimensions.observation[0].values).length; i++) {

    for (let j = 0; j < Object.keys(data.dataSets[0].series).length; j++) {
      let eurRate: ExchangeRate =
      {
        symbol: data.structure.dimensions.series[1].values[j].id,
        rate: data.dataSets[0].series[`0:${j}:0:0:0`].observations[i][0]
      }
      if (eurRates[data.structure.dimensions.observation[0].values[i].id] !== undefined) {
        eurRates[data.structure.dimensions.observation[0].values[i].id].push(eurRate);
      } else {
        eurRates[data.structure.dimensions.observation[0].values[i].id] = [eurRate]
      }
    }
  }
  return eurRates;
}
const atLeastOneDayOlder = (date: Date): boolean => {
  const today: Date = new Date();
  const timeDiff = today.getTime() - date.getTime();
  const DAY_IN_MILLISECONDS: number = 24 * 60 * 60 * 1000;

  return timeDiff > DAY_IN_MILLISECONDS;
}
const weekdayCheckAndAdjust = (date: Date): Date => {
  const dayOfWeek: number = date.getDay();
  if (dayOfWeek === 0) { // sunday -> substract one day
    console.log(`${date} is on sunday, adjusting...`);
    date.setDate(date.getDate() - 2);
  } else if (dayOfWeek === 6) { // saturdat -> substract two days
    console.log(`${date} is on saturday, adjusting...`)
    date.setDate(date.getDate() - 1);
  }
  return date;
}
export default {
  getEurRates,
  exchangeRateDictBuilderECB,
  atLeastOneDayOlder
}