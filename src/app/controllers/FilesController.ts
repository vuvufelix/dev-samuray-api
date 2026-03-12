import { Request, Response } from "express";
import { prisma } from "../../database/prismaClient";

interface MulterRequest extends Request {
  file?: Express.Multer.File;      // ou file?: Express.Multer.File se quiser opcional
}

class FilesController {
  async create(req: MulterRequest, res: Response) {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum ficheiro enviado" });
    }
    
    const { originalname: name, filename: path } = req.file

    const file = await prisma.files.create({
      data: { name, path }
    });

    return res.json(file);
  }
}

export default new FilesController()