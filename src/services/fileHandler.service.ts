import ExcelJs from "exceljs";
import fs from "fs/promises";
import path from "path";
import checkValuta, { Finds } from "./checkValuta";
import { AddData } from "./AddDataInColomn";


const INPUT_DIR = "./src/input";
const OUTPUT_DIR = "./src/output";

// create workbook instance
const main = async (workbook: ExcelJs.Workbook, buffer:ExcelJs.Buffer):Promise<ExcelJs.Buffer> => {
  //const files: string[] = await fs.readdir(INPUT_DIR);

  //let xlsx:ExcelJs.Workbook = await workbook.xlsx.readFile(`${INPUT_DIR}/${files[0]}`);
  let xlsx:ExcelJs.Workbook = await workbook.xlsx.load(buffer);
  
  const promises:Promise<void>[] = [];
  xlsx.eachSheet(worksheet => {
    let finds: Finds = checkValuta.findColums(worksheet);
      console.log(finds.columnLetterValuta);
     
      //let beginAndEndValues = checkValuta.findDataSet(worksheet, finds.columnLetterValuta);
      console.log(`working for: ${worksheet.name}`);
      //await AddData(worksheet, finds, beginAndEndValues);
      if (finds.columnLetterValuta) {
        let beginAndEndValues = checkValuta.findDataSet(worksheet, finds.columnLetterValuta);
        let promise = AddData(worksheet, finds, beginAndEndValues).then(() =>  console.log(`DONE for: ${worksheet.name}`));
        promises.push(promise);
      }

  });
  await Promise.allSettled(promises);

  //await workbook.xlsx.writeFile(`${OUTPUT_DIR}/PROCESSED_VreemdeValuta.xlsx`);
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