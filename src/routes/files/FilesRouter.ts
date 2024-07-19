import { Request, Response, Router } from "express";
import multer = require("multer");
import path = require("path");
import { upload, uploadFiles } from "../../multerConfig";

export class FilesRouter {
  private uploadFile(req: Request, res: Response): void {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
    } else {
      const filePath = req.file.path;
      res.json({ status: 200, message: "Upload success", filePath: filePath });
    }
  }
  private uploadMultipleFiles(req: Request, res: Response): void {
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      res.status(400).json({ error: "No files uploaded" });
    } else {
      const filePaths = (req.files as Express.Multer.File[]).map(
        (file) => file.path
      );
      res.json({ message: "Upload success", filePaths: filePaths });
    }
  }
  private prefix: string = "/files";

  public routes(router: Router): void {
    router.post(`${this.prefix}`, upload.single("file"), this.uploadFile);
    router.post(
      `${this.prefix}/multiple`,
      upload.array("files", 10),
      this.uploadMultipleFiles
    );
  }
}
