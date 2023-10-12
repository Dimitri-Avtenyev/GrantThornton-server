import { Request, Response } from "express"
import fileHandlerService from "../services/fileHandler.service";
import path from "path";
import fs from "fs/promises";

interface FileUploadData {
  file: string; //base64 encoded file data
  fileName: string; 
}

const getFile = async (req:Request, res:Response):Promise<Response> => {
  const {file, fileName}:FileUploadData = req.body;

  if (!file || fileName) {
    return res.status(400).json({error: "Invalid req data"});
  }

  try {
    let checkOk:boolean = await fileHandlerService.checkFileExt(file);
    if (!checkOk) {
      return res.status(400).json({error: "Invalid file extension"});
    }
  } catch(err) {
    console.log(`${err}`);
  }

  const fileBuffer:Buffer = Buffer.from(file, "base64");
  const filePath:string = path.join("./src", "input", fileName);

  await fs.writeFile(filePath, fileBuffer);

  return res.status(200).send({message: "file uploaded succesfully"});
}

const getFileLocalDemo = async (req:Request, res:Response):Promise<Response> => {


  await fileHandlerService.readXlsxDataInConsole();
 
  return res.status(200).send({message: "file uploaded succesfully"});
}


export default {
  getFile,
  getFileLocalDemo
}