import Exceljs, { CellValue, Workbook } from "exceljs";
import e from "express";
import { FoundValutaData } from "../types";
import { format } from "path";
import { log } from "console";


//benodigdheid: vragen aan user welke sheets aangepast dienen te worden, checklist met de namen van tabbladen 
// brainstorm voor 'Or' van prijs valuta, bv: wat als meerder kollomen met twee cijfers na de komma etc.
// filters in callback functie steken  
// hoofdingen dynamisch wegfilteren
// totalen er uit filteren


const findValuta = (workbook: Exceljs.Workbook, sheetID: number) => {

  let sheet: Exceljs.Worksheet = workbook.worksheets[sheetID];

  let foundValutaObj:FoundValutaData = {} as FoundValutaData;
  let foundValuta: FoundValutaData[] = [];
  let cellData: string = "";
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

  let bool: boolean = false
  let columnHeaders: string[] = [];


// kolommen bepalen
  for (let i = 1; i < sheet.actualColumnCount; i++) {
    sheet.getColumn(i).eachCell((c) => {
      if (c.value === "EUR") {
        valutaColumnLetter = sheet.getColumn(i).letter;
      }
      if (c.type == Exceljs.ValueType.Date) {
        dateColumnLetter = sheet.getColumn(i).letter;
      }
      cellData = c.text;
      let counter: number = cellData.length;
      if (cellData.charAt(counter - 3) === "." && c.type == Exceljs.ValueType.Number) {
        valueColumnLetter = sheet.getColumn(i).letter;
      }
    });
  }


  //kolomhoofdingen zoeken
  sheet.getColumn(valueColumnLetter).eachCell((c) => {
    if(c.value != null && bool == false)
    {      
      columnHeaders.push(c.address)
      bool = true
    }
    if(c.value == null && bool == true)  
    {
      bool = false
    }
  })
    



// vreemde valuta en bijhorend adress vinden | laatste conditional is hardcoded dien't nog aangepast te worden
  for (let i = 0; i < sheet.rowCount; i++) {
    if (sheet.getCell(valutaColumnLetter + i).value != "EUR" && sheet.getCell(valutaColumnLetter + i).value != null && sheet.getCell(valutaColumnLetter + i).text !=="Value") { 
      cellData = sheet.getCell(valutaColumnLetter + i).text;
      tempValuta.push(cellData);
      cellData = sheet.getCell(valutaColumnLetter + i).address;
      tempAdress.push(cellData);      
    }
  }


//bijhorende datum vinden
  counter = tempAdress.length;
  for (let i = 0; i < sheet.rowCount; i++) {
    if (sheet.getCell(dateColumnLetter + i).type == Exceljs.ValueType.Date && sheet.getCell(dateColumnLetter + i).value != null) {
      for (let n = 0; n < counter; n++) {
        cellData = sheet.getCell(dateColumnLetter + i).address
        if (cellData.substring(1, cellData.length) === tempAdress[n].substring(1, cellData.length)) {
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
      cellData = sheet.getCell(valueColumnLetter + i).address
      if (cellData.substring(1, cellData.length) === tempAdress[n].substring(1, cellData.length)) {
        cellData = sheet.getCell(valueColumnLetter + i).text;
        bufferToInt = parseInt(cellData);
        tempValue.push(bufferToInt);
      }
    }
  }
}


//cellData's bijeenvoegen in foundvaluta-object array 
for (let i = 0; i < tempValuta.length; i++) {
  foundValutaObj.valuta = tempValuta[i]
  foundValutaObj.location = tempAdress[i]
  foundValutaObj.value = tempValue[i]
  foundValutaObj.date = tempDate[i]
  foundValuta.push(foundValutaObj)
}


  columnHeaders.forEach(element => {
    console.log(element);
  });

  console.log("valuta: " + valutaColumnLetter + " date: " + dateColumnLetter + " values: " + valueColumnLetter);
  console.log(foundValuta);

  
  return foundValuta  
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