const multer = require('multer');
const uuid = require("uuid");  
const path = require('path');
const AppError = require("../utils/AppError");
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../../uploads/profile/'));
    },
    filename:function(req,file,cb){
        cb(null,uuid() + path.extname(file.originalname));
    }
});

// image validation
const fileFilter = (req,file,cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new AppError("Only images allowed", 400), false);
    }
}

module.exports = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // 5MB limit
});
