import { Request, Response } from "express"
import fileHandlerService from "../services/fileHandler.service";
import ExcelJs from "exceljs";
import { closeDb, connectDb } from "../db";

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
    await connectDb();

    let workbook: ExcelJs.Workbook = new ExcelJs.Workbook();
    let processedfile = await fileHandlerService.main(workbook, file.buffer);
    
    await closeDb();
    // !!!---- only adjust this value, assign a func with boolean as return ----!!! //
    let valutaFound:boolean = true; // replace with a check which returns boolean
    // !!!----------------------------------------------------------------------!!! //
    if (!valutaFound) {
      return res.sendStatus(204); // "No content" file has been read and nothing has been found to process
    }
    return res.send(processedfile);
    
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }

};

export default {
  getFile
}