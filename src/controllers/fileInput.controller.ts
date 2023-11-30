import { Request, Response } from "express"
import fs from "fs/promises";
import fileHandlerService from "../services/fileHandler.service";
import ExcelJs from "exceljs";
import path from "path";


// get the uploaded file through POST with formData
const getFile = async (req: Request, res: Response): Promise<Response|void> => {

  const file: Express.Multer.File | undefined = req.file;
  console.log(file?.originalname);
  // Check for invalid request data
  if (!file) {
    return res.status(400).json({ error: 'Invalid req data | no file uploaded' });
  }
  // Check the file extension 
  try {
    let checkOk: boolean = await fileHandlerService.checkFileExt(file.originalname);
    if (!checkOk) {
      return res.status(400).json({ error: "Invalid file extension" });
    }
  } catch (err) {
    console.log(`${err}`);
  }

  // Process the uploaded file 
  try {
    let workbook: ExcelJs.Workbook = new ExcelJs.Workbook();
    let processedfile = await fileHandlerService.main(workbook, file.buffer);
    return res.send(processedfile);
    
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }

  // ready and send back processed file
  
  // const filesInOutputPath:string = path.join(__dirname, "..", "output");
  // console.log(filesInOutputPath)
  // const filesInOutput:string[] = await fs.readdir(filesInOutputPath);
  // console.log(filesInOutput);
  // const filepath:string = path.join(__dirname, "..","output", filesInOutput[0]);
  // console.log(filepath);
  // return res.status(200).sendFile(filepath, async (err) => {
  //   if (err) {
  //     console.log(err);
  //     res.sendStatus(500);
  //   } else {
  //     await Promise.all([fs.unlink(filepath), fs.unlink(file.path)])
  //   }
  // });
  
};

// for demo purposes
const getFileLocalDemo = async (req: Request, res: Response): Promise<Response> => {
  let workbook: ExcelJs.Workbook = new ExcelJs.Workbook();
  //await fileHandlerService.main(workbook);

  return res.status(200).send({ message: "file uploaded succesfully" });
}


export default {
  getFile,
  getFileLocalDemo
}