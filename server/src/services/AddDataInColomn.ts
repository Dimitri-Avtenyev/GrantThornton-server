
import ExcelJs from "exceljs";
import { FoundValutaData } from "../types";
import { Finds } from "./checkValuta";
import datastorageService from "./datastorage.service";
import { isObject } from "util";

//http://localhost:3000/uploadfile/demo

// let object : Finds = {} as Finds;  
//   object = checkValuta.findColums(firstSheet); 
//   let beginAndEndValues = checkValuta.findDataSet(firstSheet, object.columnLetterValuta)

//   mainTestAddData(firstSheet, object, beginAndEndValues);


export const mainTestAddData = (worksheet: ExcelJs.Worksheet, objectFinds : Finds, colulmHeaders : number[]) :ExcelJs.Worksheet=>{
    AddColumn(worksheet, 12);  // aanpassen  K + 1, K omzetten naar number 

    objectFinds.columnLetterRate = getNextChar(objectFinds.columnLetterValue); 
    objectFinds.columnLetterConversion = getNextChar(objectFinds.columnLetterRate);  
 
    copyColumnStyle(worksheet, objectFinds.columnLetterValue, objectFinds.columnLetterRate);
    copyColumnStyle(worksheet, objectFinds.columnLetterValue, objectFinds.columnLetterConversion);

    AddDataInColomn(worksheet, objectFinds, colulmHeaders); 

    return worksheet;
}

// Voegt 2 kollomen toe naast values kollom
export const AddColumn = (worksheet: ExcelJs.Worksheet, startColomn : number) :ExcelJs.Worksheet=>{
    worksheet.spliceColumns(startColomn, 0, [], []);
    return worksheet;     
}; 

const copyColumnStyle = (worksheet: ExcelJs.Worksheet, keyCopyFromColumn: string, keyToCopyToColumn: string) : ExcelJs.Worksheet =>{
    const toCopytoColumn : ExcelJs.Column = worksheet.getColumn(keyToCopyToColumn);
    toCopytoColumn.width = worksheet.getColumn(keyCopyFromColumn).width;

    toCopytoColumn.eachCell(function(cell, rowNumber) {
        cell.style = worksheet.getCell(keyCopyFromColumn +rowNumber).style;
        // cell.value = worksheet.getCell(keyCopyFromColumn +rowNumber).value;
        // formula zit in value
    });
    return worksheet; 
}

//Conversion

const AddDataInColomn = (worksheet: ExcelJs.Worksheet, objectFinds: Finds, beginAndEndValues : number[]) :ExcelJs.Worksheet =>{
    //CurrencyRate
    const rateColumn = worksheet.getColumn(objectFinds.columnLetterRate); // K? L
    for (let i = 0; i < worksheet.rowCount; i++) {
        if (worksheet.getCell(objectFinds.columnLetterDate + i).type == ExcelJs.ValueType.Date) {
            if(worksheet.getCell(objectFinds.columnLetterValuta+ i).value=== "EUR"){
                worksheet.getCell(objectFinds.columnLetterRate+ i).value = 1;
            }else{
                const exchangeRateData = datastorageService.getLocalData (worksheet.getCell("C8").value as Date);
                exchangeRateData.then((respone)=> JSON.stringify(respone))
                .then((result)=>{
                    
                })
                worksheet.getCell(objectFinds.columnLetterRate+ i).value = 1.2;

            }
        }
    }
    for(let num of beginAndEndValues){
        worksheet.getCell(objectFinds.columnLetterRate + num).value = "Rate"; // L
    }  
   

    //Conversion
    for (let i = 0; i < worksheet.rowCount; i++) {
        if (worksheet.getCell(objectFinds.columnLetterDate + i).type == ExcelJs.ValueType.Date) {
        // let rate = parseInt(worksheet.getCell(objectFinds.columnLetterRate).text); 
        // let value = parseInt(worksheet.getCell(objectFinds.columnLetterValue).text); 
        // worksheet.getCell(objectFinds.columnLetterConversion +i ).value = value*rate; 
        //    worksheet.getCell(objectFinds.columnLetterConversion + i).value = worksheet.getCell(objectFinds.columnLetterValue +i).value as number * 1.4694
        // worksheet.getCell(objectFinds.columnLetterConversion + i).value = {sharedFormula :`${objectFinds.columnLetterValue + i}*${objectFinds.columnLetterRate+i}`, result:0};  

        }
    }
    for(let num of beginAndEndValues){
        worksheet.getCell(objectFinds.columnLetterConversion+ num).value = "Conversion"; // M
    }
  
    
    return worksheet;
}
       
const getNextChar= (char:string): string =>{  // ZZ--> AAA
    let letter = ""; 
    char = char.toLocaleUpperCase(); 
        if(char.endsWith('Z')){ //AZ --> BA
            let strSplit =char.split(''); 
            for (let i = char.length -1; i >= 0; i--) {            
                if(strSplit[i] === 'Z'){
                    strSplit[i] = 'A';   
                }else{
                    strSplit[i] =  String.fromCharCode(strSplit[i].charCodeAt(0)+1);
                    break;
                }
            }    
            letter =strSplit.join(''); 
            if(strSplit.every(val => val === strSplit[0])){  // ZZ --> AAA
                letter = letter + 'A'; 
            }
        }else{  // AB --> AC  , AAB --> AAC
            letter = char.substring(0, char.length -1);
            letter = letter + String.fromCharCode(char.substring(char.length -1).charCodeAt(0)+1);
        }
    return letter;   
}


