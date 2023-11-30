import { Request, Response } from "express"

const welcome = async (req:Request, res:Response):Promise<Response> => {

  return res.status(200).json({message: "Welcome to GrantThornton excel processing of foreign exchange values!"});
}

export default {welcome};