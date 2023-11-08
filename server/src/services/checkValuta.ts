import Exceljs, { CellValue, Workbook } from "exceljs";
import e from "express";
import { FoundValutaData } from "../types";
import { format } from "path";
import { log } from "console";


//nbenodigdheid: vragen aan user welke sheets aangepast dienen te worden, checklist met de namen van tabbladen 
// brainstorm voor 'Or' van prijs valuta, bv: wat als meerder kollomen met twee cijfers na de komma etc.
// filters in callback functie steken  
// hoofdingen dynamisch wegfilteren
// geen valuta beteknt hoogstwaarschijjnlijk geen vreemde valuta


const findValuta = (workbook: Exceljs.Workbook, sheetID: number) => {

  let sheet: Exceljs.Worksheet = workbook.worksheets[sheetID];

  let foundValutaObj:FoundValutaData = {} as FoundValutaData;
  let foundValuta: FoundValutaData[] = [];
  let buffer: string = "";
  let counter: number;
  let bufferToInt: number;
  let bufferDate: Date;

  let valutaColumnLetter: string = "";
  let dateColumnLetter: string = "";
  let valueColumnLetter: string = "";

  let tempAdress: string[] = [];
  let tempDate: Date[] = [];
  let tempValuta: string[] = [];
  let tempValue: number[] = [];



// kolommen bepalen
  for (let i = 1; i < sheet.actualColumnCount; i++) {
    sheet.getColumn(i).eachCell((c) => {
      if (c.value === "EUR") {
        valutaColumnLetter = sheet.getColumn(i).letter;
      }
      if (c.type == Exceljs.ValueType.Date) {
        dateColumnLetter = sheet.getColumn(i).letter;
      }
      buffer = c.text;
      let counter: number = buffer.length;
      if (buffer.charAt(counter - 3) === "." && c.type == Exceljs.ValueType.Number) {
        valueColumnLetter = sheet.getColumn(i).letter;
      }
    });
  }

// vreemde valuta en bijhorend adress vinden
  for (let i = 0; i < sheet.rowCount; i++) {
    if (sheet.getCell(valutaColumnLetter + i).value != "EUR" && sheet.getCell(valutaColumnLetter + i).value != null && sheet.getCell(valutaColumnLetter + i).text !=="Value") {
      buffer = sheet.getCell(valutaColumnLetter + i).text;
      tempValuta.push(buffer);
      buffer = sheet.getCell(valutaColumnLetter + i).address;
      tempAdress.push(buffer);
    }
  }


//bijhorende datum vinden
  counter = tempAdress.length;
  for (let i = 0; i < sheet.rowCount; i++) {
    if (sheet.getCell(dateColumnLetter + i).type == Exceljs.ValueType.Date && sheet.getCell(dateColumnLetter + i).value != null) {
      for (let n = 0; n < counter; n++) {
        buffer = sheet.getCell(dateColumnLetter + i).address
        if (buffer.substring(1, buffer.length) === tempAdress[n].substring(1, buffer.length)) {
          bufferDate = sheet.getCell(dateColumnLetter + i).value as Date;
          tempDate.push(bufferDate);
        }
      }
    }
  }


//bijhorende value vinden
for (let i = 0; i < sheet.rowCount; i++) {
  if (sheet.getCell(valueColumnLetter + i).type == Exceljs.ValueType.Number && sheet.getCell(valueColumnLetter + i).value != null) {   
   
    for (let n = 0; n < counter; n++) {
      buffer = sheet.getCell(valueColumnLetter + i).address
      if (buffer.substring(1, buffer.length) === tempAdress[n].substring(1, buffer.length)) {
        buffer = sheet.getCell(valueColumnLetter + i).text;
        bufferToInt = parseInt(buffer);
        tempValue.push(bufferToInt);
      }
    }
  }
}


//temp's bijeenvoegen in foundvaluta-object array 
for (let i = 0; i < tempValuta.length; i++) {
  foundValutaObj.valuta = tempValuta[i]
  foundValutaObj.location = tempAdress[i]
  foundValutaObj.value = tempValue[i]
  foundValutaObj.date = tempDate[i]
  foundValuta.push(foundValutaObj)
}


tempValuta.forEach(element => {
  console.log(element);
});
tempValue.forEach(element => {
  console.log(element);
});
  tempAdress.forEach(element => {
    console.log(element);
  });
  tempDate.forEach(element => {
    console.log(element);
  });



  


  console.log("valuta: " + valutaColumnLetter + " date: " + dateColumnLetter + " values: " + valueColumnLetter);
  console.log(foundValuta);

};

/*
const findValutaEachSheet = (workbook: Exceljs.Workbook) => {
  let numberOfWorksheets: number = 0;
  let kolomPerTablad: string;

  workbook.eachSheet(function (inputWorksheet: Exceljs.Worksheet, id: number) {
    numberOfWorksheets++;
  });

  console.log("Aantal tabbladen: " + numberOfWorksheets);

  for (let n = 0; n < numberOfWorksheets; n++) {
    let sheet: Exceljs.Worksheet = workbook.worksheets[n];
    let tempResult: string = "";

    for (let i = 1; i < sheet.actualColumnCount; i++) {
      sheet.getColumn(i).eachCell((c) => {
        if (c.value === "EUR" || c.value) {
          tempResult = "tabblad: " + (n + 1) + "kolom: " + sheet.getColumn(i).letter;
        }

        console.log(tempResult);

      });
    }
  }
};
*/




export default {
  findValuta,
};