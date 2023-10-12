import ExcelJs from "exceljs";
import fs from "fs";
import path from "path";

const INPUT_DIR = "./src/input";
const OUTPUT_DIR = "./src/output";
const files: string[] = fs.readdirSync(INPUT_DIR);


// create workbook instance
const main = async (workbook: ExcelJs.Workbook) => {

  let xlsx:ExcelJs.Workbook = await workbook.xlsx.readFile(`${INPUT_DIR}/${files[0]}`);
  // demo firstsheet, find value then write back to xlsx file
  let firstSheet:ExcelJs.Worksheet = xlsx.worksheets[0];

  findFxValue(firstSheet);

  firstSheet.getCell("B1").value = "this excel file has been altered as a demo";
  workbook.xlsx.writeFile(`${OUTPUT_DIR}/testWriteToFile.xlsx`)
    .then(() => console.log(`file created and stored @ ${OUTPUT_DIR}`));

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
  console.log(`Foreign exchange symbols are found @ col ${columnLetter}`);
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