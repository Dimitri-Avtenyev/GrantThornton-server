import ExcelJs from "exceljs";
import path from "path";
import checkValuta from "./checkValuta";
import { Finds } from "../types";
import { AddData } from "./AddDataInColomn";

// create workbook instance
const main = async (workbook: ExcelJs.Workbook, buffer:ExcelJs.Buffer):Promise<ExcelJs.Buffer> => {

  let xlsx:ExcelJs.Workbook = await workbook.xlsx.load(buffer);
  
  const promises:Promise<void>[] = [];
  xlsx.eachSheet(worksheet => {
    let finds: Finds = checkValuta.findColums(worksheet);
    let noValuta: boolean = true;
      console.log(`working for: ${worksheet.name}`);
      if(finds.columnLetterValuta !== ""){
       noValuta = false;
      }
      if (finds.columnLetterValuta) { //?
        let beginValues = checkValuta.findDataSet(worksheet, finds.columnLetterValuta);
        let promise = AddData(worksheet, finds, beginValues).then(() =>  console.log(`DONE for: ${worksheet.name}`));
        promises.push(promise);
      }

  });
  await Promise.allSettled(promises);
  
  return await workbook.xlsx.writeBuffer();
}


const checkFileExt = async (fileName:string):Promise<boolean> => {
  const allowedFileExtension:string = ".xlsx"
  const fileExtension = path.extname(fileName).toLowerCase();

  if (allowedFileExtension !== fileExtension) {
    throw new Error("File extension not allowed");
  }
  return allowedFileExtension === fileExtension;
}

export default {
  main,
  checkFileExt
};