
import ExcelJs from "exceljs";

// mainTestFunc(firstSheet);
//http://localhost:3000/uploadfile/demo

export const mainTestFunc = (worksheet: ExcelJs.Worksheet) :ExcelJs.Worksheet=>{
    AddColumn(worksheet, 12);

    //       column by num    11   12 && 13
    copyColumnStyle(worksheet, "K", "L");
    copyColumnStyle(worksheet, "K", "M");

    AddDataInColomn(worksheet); 


    return worksheet;
}

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

const AddDataInColomn = (worksheet: ExcelJs.Worksheet) :ExcelJs.Worksheet =>{
    //CurrencyRate
    worksheet.getCell("L"+ 7).value = "Rate"; 

    const rateColumn = worksheet.getColumn("K");

    let count = 0;
    for(let cell of rateColumn.values){
        if(cell === undefined){
            count++;
        }
        console.log(cell);
        
    }
    console.log(count);
    

    // rateColumn.values = [1,1,1,1,1,1,1];

    //Conversion
    worksheet.getCell("M" + 7).value = "Conversion"; 
    
    return worksheet;
}

       



