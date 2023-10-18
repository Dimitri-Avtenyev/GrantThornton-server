import Exceljs, { Workbook }  from 'exceljs';
import e from 'express';

const findValuta = (workbook:Exceljs.Workbook) => {
    let numberOfWorksheets: number = 0;

    workbook.eachSheet(function(inputWorksheet : Exceljs.Worksheet, id: number){
        numberOfWorksheets++;
    })

    console.log(numberOfWorksheets)
}
export default
{
    findValuta
}
