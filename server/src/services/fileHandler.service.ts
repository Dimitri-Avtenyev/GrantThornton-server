import ExcelJs from "exceljs";
import fs from "fs/promises";
import path from "path";
import checkValuta from "./checkValuta";

const INPUT_DIR = "./src/input";
const OUTPUT_DIR = "./src/output";

// create workbook instance
const main = async (workbook: ExcelJs.Workbook) => {
  const files: string[] = await fs.readdir(INPUT_DIR);

  let xlsx:ExcelJs.Workbook = await workbook.xlsx.readFile(`${INPUT_DIR}/${files[0]}`);
  
  // DEMO firstsheet, find value then write back to xlsx file
  let firstSheet:ExcelJs.Worksheet = xlsx.worksheets[0];

  findFxValue(firstSheet);

  firstSheet.getCell("B1").value = "this excel file has been altered as a demo";
  await workbook.xlsx.writeFile(`${OUTPUT_DIR}/demoVreemdeValuta.xlsx`);

  checkValuta.findValuta(workbook, 0);

  // todo: cleanup -> remove unnec.files (e.g. cleanup();)
}

// demo find value and print location found said value
const findFxValue = async (input: ExcelJs.Worksheet) => {
  let columnLetter:string = "";
 
  for (let i = 1; i<input.actualColumnCount; i++) {
   
    input.getColumn(i).eachCell(c => {
     if (c.value === "EUR") {
      columnLetter = input.getColumn(i).letter;
     }
    });
  }
  //console.log(`Foreign exchange symbols are found @ col ${columnLetter}`);
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