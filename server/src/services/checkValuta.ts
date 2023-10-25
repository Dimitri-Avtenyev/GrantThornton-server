import Exceljs, { Workbook } from "exceljs";
import e from "express";

//idee: vragen aan user welke sheets aangepast dienen te worden mogelijks checklist met de namen van tabbladen (text input is voor problemen vragen)
// interface voor array van gevonden versch. valuta 
// date kolom vinden


const findValuta = (workbook: Exceljs.Workbook) => {
  let numberOfWorksheets: number = 0;
  let kolomPerTablad: string;

  workbook.eachSheet(function (inputWorksheet: Exceljs.Worksheet, id: number) {
    numberOfWorksheets++;
  });

  console.log("Aantal tabbladen: " + numberOfWorksheets);

  for (let n = 0; n < numberOfWorksheets; n++) {
    let tablad: Exceljs.Worksheet = workbook.worksheets[n];
    let tempResult: string = "";
    
    for (let i = 1; i < tablad.actualColumnCount; i++) {
      tablad.getColumn(i).eachCell((c) => {
        if (c.value === "EUR" || c.value) {
          tempResult = "tabblad: " + (i+1) + "kolom: " + tablad.getColumn(i).letter;
        }

      console.log(tempResult);

      });
    }
  }

  
};
export default {
  findValuta,
};
