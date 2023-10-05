import { Request, Response } from "express"
import readinputService from "../services/readinput.service";

const getInputFile = async (req:Request, res:Response):Promise<Response> => {
  readinputService.printFileNames();
  readinputService.readXlsxDataInConsole();
  return res.status(200).send("hello from \"readinput.controller\"");
}

export default {
  getInputFile
}