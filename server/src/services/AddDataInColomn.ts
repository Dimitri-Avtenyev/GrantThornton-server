
import ExcelJs from "exceljs";

//AddDataToColumn(firstSheet);
//http://localhost:3000/uploadfile/demo

export const AddColumn = (worksheet: ExcelJs.Worksheet, startColomn : number) :ExcelJs.Worksheet=>{
    worksheet.spliceColumns(startColomn, 0, []);
    worksheet = copyColumn(worksheet); 
    
    return worksheet;     
}; 

const copyColumn = (worksheet: ExcelJs.Worksheet) : ExcelJs.Worksheet =>{
    let keyToCopyToColumn: string = "L";
    let keyCopyFromColumn: string = "K";  

    const toCopytoColumn : ExcelJs.Column = worksheet.getColumn(keyToCopyToColumn);
    toCopytoColumn.width = worksheet.getColumn(keyCopyFromColumn).width;

    toCopytoColumn.eachCell(function(cell, rowNumber) {
        cell.style = worksheet.getCell(keyCopyFromColumn +rowNumber).style;
        cell.value = worksheet.getCell(keyCopyFromColumn +rowNumber).value;
    });

    return worksheet; 
}


