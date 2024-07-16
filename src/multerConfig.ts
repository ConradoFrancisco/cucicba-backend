import multer = require("multer");
import path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const fileName = file.fieldname + "-" + uniqueSuffix + ext;
    cb(null, fileName);
  },
});
const storageFiles = multer.diskStorage({
  destination: "files/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // Obtener la extensión del archivo original
    const fileName = file.fieldname + "-" + uniqueSuffix + ext; // Concatenar la extensión al nombre del archivo
    cb(null, fileName);
  },
});
export const uploadFiles = multer({ storage: storageFiles });
/* const upload = multer({ storage });
 app.post('/upload-multiple', upload.array('files', 10), (req, res) => {
   if (!req.files || req.files.length === 0) {
     return res.status(400).json({ error: 'No files uploaded' });
   }
   const filePaths = (req.files as Express.Multer.File[]).map(file => file.path);
   return res.json({ message: 'Upload success', filePaths: filePaths });
 }); */

export const upload = multer({ storage });
