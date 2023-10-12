import ExcelJs from "exceljs";
import fs from "fs";
import path from "path";

const INPUT_DIR = "./src/input";
const OUTPUT_DIR = "./src/output";
const files: string[] = fs.readdirSync(INPUT_DIR);


const printFileNames = () => {
  files.forEach(file => console.log(file));
}

const getFilePathName = (name: string): string => {
  let filename: string | undefined = files.find(file => file === name);
  if (!filename) {
    console.log("No file has been found or dir is empy");
    return "";
  }

  return filename;
}
// create workbook on global file level 
const WORKBOOK:ExcelJs.Workbook = new ExcelJs.Workbook();

const loadXlsxFile = async ():Promise<ExcelJs.Workbook> => {
  return await WORKBOOK.xlsx.readFile(`${INPUT_DIR}/${files[0]}`);
}

// test printing in console
const readXlsxDataInConsole = async () => {
  let xlsx:ExcelJs.Workbook =   await loadXlsxFile();
  let firstSheet:ExcelJs.Worksheet = xlsx.worksheets[0];
  
  let firstColumn:ExcelJs.Column = firstSheet.getColumn(1);

  // prints values of each cell of first column
  //firstColumn.eachCell(c => console.log(c.value));
  findFxValue(firstSheet);

  // add some values
  // then e.g. write to file

  firstSheet.getCell("B1").value = "this excel file has been altered as a demo";
  //WORKBOOK.xlsx.writeFile(`${OUTPUT_DIR}/testWriteToFile.xlsx`)
  //  .then(() => console.log(`file created and stored @ ${OUTPUT_DIR}`));
}

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
  getFilePathName,
  printFileNames,
  loadXlsxFile,
  readXlsxDataInConsole,
  checkFileExt
};