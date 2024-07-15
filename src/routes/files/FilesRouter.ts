import { Request, Response, Router } from "express";
import multer = require("multer");
import path = require("path");
import { upload } from "../../multerConfig";

export class FilesRouter {
  private uploadFile(req: Request, res: Response): void {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
    } else {
      const filePath = req.file.path;
      res.json({ message: "Upload success", filePath: filePath });
    }
  }

  private prefix: string = "/files";

  public routes(router: Router): void {
    router.post(`${this.prefix}`, upload.single("file"), this.uploadFile);
  }
}
